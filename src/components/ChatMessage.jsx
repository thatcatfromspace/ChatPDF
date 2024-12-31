import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/MarkdownRenderer.jsx";
import PropTypes from "prop-types";

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
          alt={`${username} profile`}
          className="mt-4 h-8 w-8 rounded-full object-cover"
        />
        <div className="mt-5 text-sm">
          <MarkdownRenderer markdownText={messageText} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;

ChatMessage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  username: PropTypes.string,
  messageText: PropTypes.string.isRequired
}