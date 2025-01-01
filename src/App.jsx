/* library imports */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

/* services */
import askQuestion from "@/services/ask-question";
import allFiles from "@/services/all-files";

/* component imports */
import ChatMessage from "@/components/ChatMessage";
import { File, SendHorizonal } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import WaitingIndicator from "@/components/WaitingIndicator";
import { Toaster, toast } from "sonner";
import { Dropdown } from "flowbite-react";

/* stylesheets */
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [currentChat, setCurrentChat] = useState([
    { author: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [isWaiting, setIsWaiting] = useState(false); // to show the waiting skeleton
  const [userFiles, setUserFiles] = useState(null);
  const [contextFile, setContextFile] = useState("");
  const [showFileSelectMessage, setShowFileSelectMessage] = useState(false);
  const [fileUploadState, setFileUploadState] = useState("#FFAA33");
  const waitingForReply = useRef(false);
  const newFileUploaded = useRef(false); // to keep track of new file being uploaded

  // Ref to track the last message
  const chatEnd = useRef(null);

  // Ref to access the input field
  const inputRef = useRef(null);

  /* helper functions */

  const handleKeyPress = async (event, fromMouse) => {
    const inputValue = fromMouse ? prompt : event.target.value;

    if (fromMouse || event.key === "Enter") {
      if (!contextFile) {
        toast.error("Please upload a file first.");
        inputRef.current.value = "";
        return;
      }
      if (inputValue.trim()) {
        setCurrentChat([
          ...currentChat,
          { author: "Dinesh", content: inputValue },
        ]);
        setPrompt("");
        // Clear the input field directly using the ref
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        waitingForReply.current = true;
        setIsWaiting(true);

        try {
          const req = { question: inputValue };
          const response = await askQuestion(req, contextFile.name);
          if (typeof response === "string") {
            toast.error(response || "Something went wrong. Please try again.");
          }
          const answer = response.answer;
          setCurrentChat((prevChat) => [
            ...prevChat,
            { author: "bot", content: answer },
          ]);
        } catch (error) {
          console.error("Error fetching response:", error);
          toast.error("Error fetching response. Please try again.");
        } finally {
          setIsWaiting(false);
          waitingForReply.current = false;
        }
      }
    }
  };

  const handleTextChange = (event) => {
    setPrompt(event.target.value);
  };

  /* Scroll to the bottom of the reference div at the end of every new chat */
  useEffect(() => {
    if (chatEnd.current) {
      chatEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);

  /* Since we haven't done auth, implement a basic identity service using uuid */
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      localStorage.setItem("user_id", uuid());
    }
  }, []);

  const fetchFiles = async () => {
    await allFiles().then((serverFiles) => {
      if (typeof serverFiles === "string") {
        return toast.error(serverFiles);
      } else {
        if (serverFiles.files.length > 1) {
          setUserFiles(serverFiles.files);
        }
      }
    });
  };

  /* Since useEffect callback cannot be async */
  useEffect(() => {
    fetchFiles();
  }, [file]);

  const FileSelectMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        <img
          src="/ai-planet-logo-min.png"
          alt={"bot profile"}
          className="mt-4 h-8 w-8 rounded-full object-cover"
        />
        <div className="mt-5 flex flex-col space-y-4 text-sm">
          <div>
            {
              "It looks like you've uploaded more than one file. Which file would you like me to generate responses from?"
            }
          </div>
          <div className="w-fit max-w-fit">
            <Dropdown label="Select a file" className="w-14" inline>
              {userFiles.map((file, idx) => (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    setContextFile(file);
                    setShowFileSelectMessage(false);
                    setIsWaiting(true);
                  }}
                >
                  {file}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <nav className="fixed z-10 w-full bg-white">
        <div className="flex h-14 w-full min-w-fit items-center justify-between px-5 shadow-md sm:h-16 sm:px-10">
          <img src="/ai-planet-logo.svg" alt="AI Planet Logo" />
          <div className="flex items-center justify-between space-x-7 align-middle">
            {file && (
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-md border p-1"
                  style={{ borderColor: fileUploadState }} // dynamic Tailwind classes are not encouraged!
                >
                  <File size={20} strokeWidth={1.5} color={fileUploadState} />
                </div>
                <div>
                  <span
                    className="hidden text-sm sm:flex"
                    style={{ color: fileUploadState }}
                  >
                    {file.name}
                  </span>
                </div>
              </div>
            )}
            <div>
              <FileUpload
                fileUploadStateSetter={setFileUploadState}
                newFileUploaded={newFileUploaded}
                contextFileSetter={setContextFile}
                fileSetter={setFile}
              />
            </div>
          </div>
        </div>
      </nav>
      <main className="sm:min-h-[calc(100vh-56px] relative flex min-h-[calc(100vh-64px)] w-full flex-col space-y-5 px-8 py-5 pt-20 sm:px-20">
        <motion.div className="space-y-5">
          {currentChat.map((chatMessage, index) => (
            <ChatMessage
              messageText={chatMessage.content}
              imageSrc={
                chatMessage.author === "bot"
                  ? "/ai-planet-logo-min.png"
                  : "cat.png"
              }
              username={chatMessage.author}
              key={index}
            />
          ))}

          <div ref={chatEnd} />
        </motion.div>
        {showFileSelectMessage && <FileSelectMessage />}
        {isWaiting && !showFileSelectMessage && <WaitingIndicator />}
        <div className="invisible h-24 min-h-24">lorem19</div>
        <div className="xl:48 fixed bottom-6 right-2 z-10 flex w-[99vw] justify-center px-5 sm:right-8 sm:px-24 md:px-36">
          <div className="border-chat-4 chat-box flex h-10 w-full min-w-[80%] items-center rounded-md border-chat bg-chat px-5">
            <input
              ref={inputRef}
              className="w-full overflow-y-scroll bg-chat text-sm outline-none"
              placeholder="Send a message..."
              onChange={handleTextChange}
              onKeyDown={handleKeyPress}
              disabled={waitingForReply.current}
              autoFocus
            />
            <SendHorizonal
              stroke={"#c4c5ce"}
              strokeWidth={1.5}
              onClick={async () => {
                await handleKeyPress({}, true);
              }}
            />
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </main>
    </>
  );
}

export default App;
