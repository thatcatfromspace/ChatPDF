import axios from "axios";

const uploadPdf = async (file) => {
  const data = new FormData();
  data.append("file", file);
  await axios
    .post("http://localhost:8000/upload_pdf/", data, {
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
