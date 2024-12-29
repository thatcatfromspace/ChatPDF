import { motion } from "framer-motion";

function WaitingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-10"
    >
      <span className="text-sm">Waiting for response...</span>
    </motion.div>
  );
}

export default WaitingIndicator;
