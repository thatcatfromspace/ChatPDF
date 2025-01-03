import { PlusCircle } from "lucide-react";
import PropTypes from "prop-types";
import uploadPdf from "@/services/upload-pdf";
import { useRef } from "react";
import { toast } from "sonner";

const FileUpload = ({
  fileUploadStateSetter,
  contextFileSetter,
  fileSetter,
}) => {
  const documentUploaded = useRef(false);

  /*
   * Custom React component to upload a file. We restrict the file type to PDFs only.
   * Every error is handled and shown as a toast notification.
   * The file is uploaded to the server using the uploadPdf service.
   * */
  const handleFileChange = async (event) => {
    const file = event.target.files[event.target.files.length - 1]; // upload the latest uploaded file
    if (file && file.type === "application/pdf") {
      fileSetter(file);
      contextFileSetter(file);
      documentUploaded.current = true;

      try {
        uploadPdf(file).then((response) => {
          if (response.includes("successful")) {
            toast.success(
              "File uploaded successfully and queued for processing."
            );
            fileUploadStateSetter("#0FA958");
          } else {
            toast.error("File upload failed.");
            fileUploadStateSetter("#ab2525");
          }
        });
        // eslint-disable-next-line no-unused-vars
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
  fileUploadStateSetter: PropTypes.func.isRequired,
  contextFileSetter: PropTypes.func.isRequired,
  fileSetter: PropTypes.func.isRequired,
};
