import axios from "axios";

const askQuestion = async (question) => {
  try {
    const response = await axios.post(
      "http://192.168.1.36:8000/ask_question/",
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
