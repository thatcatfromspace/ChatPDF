import axios from "axios";

const uploadPdf = async (file) => {
  const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

  const data = new FormData();
  data.append("file", file);

  await axios
    .post(`${BACKEND_URL}/api/upload_pdf/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.message;
      } else return "File upload failed";
    });
  return "File upload successful.";
};

export default uploadPdf;
