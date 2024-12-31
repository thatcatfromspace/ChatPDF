import axios from "axios";

const askQuestion = async (question) => {
  const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
  const userId = localStorage.getItem("user_id");

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/ask_question/?user_id=${userId}`,
      question,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return "Question submission failed";
    }
  } catch (error) {
    return "Something went wrong. Please try again.";
  }
};

export default askQuestion;
