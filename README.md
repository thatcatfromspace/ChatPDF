### Project Overview

This project is a React-based web application that allows users to upload PDF files and interact with a chatbot. The
application uses several components and libraries to provide a seamless user experience.

**A live demo is available at [https://ai-planet-chatbot.vercel.app](https://ai-planet-chatbot.vercel.app)!**

### Key Components

1. **App.jsx**: The main component that manages the overall application state and layout.
2. **FileUpload.jsx**: A component for uploading PDF files.
3. **WaitingIndicator.jsx**: A component that displays a loading skeleton while waiting for a response from the server.
4. **ChatMessage.jsx**: A component for individual chat messages, increasing modularity.
5. **askQuestion**: A function (not provided in the excerpts) that sends a question to the server and retrieves the
   response.

### Code Architecture

#### App.jsx

- **State Management**: Uses `useState` to manage the state of the file, prompt, current chat, and waiting status.
- **Refs**: Uses `useRef` to manage references to the chat end and input field.
- **Effects**: Uses `useEffect` to scroll to the bottom of the chat when a new message is added.
- **Event Handlers**:
    - `handleKeyPress`: Handles the Enter key press or mouse click to send a message.
    - `handleTextChange`: Updates the prompt state when the input field changes.
- **UI Layout**: Renders the navigation bar, main chat area, and input field.

#### FileUpload.jsx

- **State Management**: Uses `useRef` to track if a document has been uploaded.
- **Event Handlers**:
    - `handleFileChange`: Handles file selection and uploads the file to the server.
- **UI Layout**: Renders a file input and label for uploading PDFs.

#### WaitingIndicator.jsx

- **UI Layout**: Displays a loading skeleton using the `react-loading-skeleton` library.

### Interactions

- **File Upload**: The `FileUpload` component allows users to upload a PDF file, which is then set in the `App`
  component's state.
- **Chat Interaction**: Users can type messages in the input field, which are sent to the server using the `askQuestion`
  function. The response is then displayed in the chat.
- **Loading Indicator**: The `WaitingIndicator` component is displayed while waiting for a server response.

### Conclusion

This documentation provides an overview of the project's architecture, key components, and their interactions. Each
component is documented with comments explaining its purpose and functionality.