import { PlusCircle } from "lucide-react";
import PropTypes from "prop-types";
import uploadPdf from "@/services/upload-pdf";
import { useRef } from "react";
import { toast } from "sonner";

const FileUpload = ({ selectedFileSetter, fileUploadStateSetter }) => {
  const documentUploaded = useRef(false);

  /*
   * Custom React component to upload a file. We restrict the file type to PDFs only.
   * Every error is handled and shown as a toast notification.
   * The file is uploaded to the server using the uploadPdf service.
   * */
  const handleFileChange = async (event) => {
    const file = event.target.files[event.target.files.length - 1]; // upload the latest uploaded file
    if (file && file.type === "application/pdf") {
      selectedFileSetter(file);
      documentUploaded.current = true;

      try {
        uploadPdf(file).then((response) => {
          if (response.includes("successful")) {
            toast.success(
              "File uploaded successfully! However, it might take a while for the server to process your file."
            );
            fileUploadStateSetter("#0FA958");
          } else {
            toast.error("File upload failed.");
            fileUploadStateSetter("#ab2525");
          }
        });
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        fileUploadStateSetter("#ab2525");
      }
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
  selectedFileSetter: PropTypes.func,
  fileState: PropTypes.object,
  fileUploadStateSetter: PropTypes.func,
};
