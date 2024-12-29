import { PlusCircle } from "lucide-react";
import PropTypes from "prop-types";
import uploadPdf from "@/services/upload-pdf";
import { useRef } from "react";
import { toast } from "sonner";

const FileUpload = ({ selectedFile, setSelectedFile }) => {
  const documentUploaded = useRef(false);

  const handleUpload = async () => {
    if (!documentUploaded.current) {
      toast.error("No file selected.");
      return;
    }
    try {
      await uploadPdf(selectedFile).then((response) => {
        if (response.status === 200) {
          toast.success("File uploaded successfully!");
        } else {
          toast.error("File upload failed.");
        }
      });
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      documentUploaded.current = true;
      await handleUpload();
    } else {
      toast.warning("Please select a valid PDF file.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        id="pdf-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor="pdf-upload" className="cursor-pointer">
        <div className="border-1 flex items-center space-x-4 rounded-md border border-black px-1 py-1 align-middle text-sm sm:px-5">
          <PlusCircle size={16} strokeWidth={1.5} />
          <span className="hidden sm:flex">Upload PDF</span>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  selectedFile: PropTypes.object,
  setSelectedFile: PropTypes.func,
};
