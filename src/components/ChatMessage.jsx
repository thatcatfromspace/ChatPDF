import { motion } from "framer-motion";
import Markdown from "react-markdown";

const ChatMessage = ({ imageSrc, username, messageText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        <img
          src={imageSrc}
          alt={`${username}'s avatar`}
          className="mt-4 h-8 w-8 rounded-full object-cover"
        />
        <div className="mt-5 text-sm">
          <Markdown>{messageText}</Markdown>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
