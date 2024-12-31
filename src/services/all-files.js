import axios from "axios";

/* Fetch user's files from the server. If user has multiple files uploaded,
 * prompt user to ask which files must be used, so the server knows which retriever
 * to use.
 */
const allFiles = async () => {
  const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
  const userId = localStorage.getItem("user_id");

  try {
    await axios
      .get(`${BACKEND_URL}/api/get_files/?user_id=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          return "Sorry, your files couldn't be fetched.";
        }
      });
  } catch (err) {
    return "Sorry, your files couldn't be fetched.";
  }
};

export default allFiles;
