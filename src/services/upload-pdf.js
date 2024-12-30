import axios from "axios";

const uploadPdf = async (file) => {
  const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

  const data = new FormData();
  data.append("file", file);

  await axios
    .post(`${BACKEND_URL}/upload_pdf/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else return "File upload failed";
    });
};

export default uploadPdf;
