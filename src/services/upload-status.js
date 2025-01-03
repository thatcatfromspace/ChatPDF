import axios from "axios";

const uploadStatus = async (file) => {
  const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
  const userId = localStorage.getItem("user_id");

  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/upload_status/?user_id=${userId}&file_path=${file}`
    );

    if (response.status === 200) {
      return response.data.status;
    } else {
      return "Couldn't fetch status.";
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return "Something went wrong. Please try again.";
  }
};

export default uploadStatus;
