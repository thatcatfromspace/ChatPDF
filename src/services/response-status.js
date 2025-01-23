import axios from "axios";

const responseStatus = async (file) => {
  const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
  const userId = localStorage.getItem("user_id");

  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/response_status/?user_id=${userId}&file_path=${file}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return "Couldn't fetch status.";
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return "Something went wrong. Please try again.";
  }
};

export default responseStatus;
