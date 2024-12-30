/* library imports */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* services */
import askQuestion from "@/services/ask-question";

/* component imports */
import ChatMessage from "@/components/ChatMessage";
import { File, SendHorizonal } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import WaitingIndicator from "@/components/WaitingIndicator";
import { Toaster, toast } from "sonner";

/* stylesheets */
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [currentChat, setCurrentChat] = useState([
    { author: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [isWaiting, setIsWaiting] = useState(false);
  const waitingForReply = useRef(false);

  // Ref to track the last message
  const chatEnd = useRef(null);

  // Ref to access the input field
  const inputRef = useRef(null);

  /* helper functions */

  const handleKeyPress = async (event, fromMouse) => {
    const inputValue = fromMouse ? prompt : event.target.value;

    if (fromMouse || event.key === "Enter") {
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
          const response = await askQuestion(req);
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

  return (
    <>
      <nav className="fixed z-10 w-full bg-white">
        <div className="flex h-14 w-full min-w-fit items-center justify-between px-5 shadow-md sm:h-16 sm:px-10">
          <img src="/ai-planet-logo.svg" alt="AI Planet Logo" />
          <div className="flex items-center justify-between space-x-7 align-middle">
            {file && (
              <div className="flex items-center space-x-2">
                <div className="rounded-md border border-primary/50 p-1">
                  <File size={20} strokeWidth={1.5} color={"#0FA958"} />
                </div>
                <div>
                  <span className="hidden text-sm text-primary sm:flex">
                    {file.name}
                  </span>
                </div>
              </div>
            )}
            <div>
              <FileUpload setSelectedFile={setFile} />
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
        {isWaiting && <WaitingIndicator />}
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
        <Toaster position="top-right" />
      </main>
    </>
  );
}

export default App;
