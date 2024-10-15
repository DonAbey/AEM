import React, { useState } from "react";
import "./DocumentEditor.css";

function DocumentEditor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const downloadDocument = async (fileName, fileType) => {
    try {
      const response = await fetch(`https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/download-document?file_name=${fileName}`);
      if (!response.ok) throw new Error("Failed to download file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.${fileType}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const uploadDocument = async (fileName) => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/upload-document?file_name=${fileName}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");
      alert("File uploaded successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="document-editor-container">
      <h2>Download and Upload Documents</h2>

      {/* Wallet Document */}
      <div className="document-action">
        <button onClick={() => downloadDocument('wallet', 'docx')}>Download Wallet Document</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('wallet')}>Upload Wallet Document</button>
      </div>

      {/* Company Profile */}
      <div className="document-action">
        <button onClick={() => downloadDocument('company_profile', 'docx')}>Download Company Profile</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('company_profile')}>Upload Company Profile</button>
      </div>

      {/* Email Queries */}
      <div className="document-action">
        <button onClick={() => downloadDocument('email_queries', 'pdf')}>Download Email Queries</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('email_queries')}>Upload Email Queries</button>
      </div>

      {/* Exporting Document */}
      <div className="document-action">
        <button onClick={() => downloadDocument('exporting', 'docx')}>Download Exporting Document</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('exporting')}>Upload Exporting Document</button>
      </div>

      {/* Help and Support */}
      <div className="document-action">
        <button onClick={() => downloadDocument('help_and_support', 'docx')}>Download Help and Support</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('help_and_support')}>Upload Help and Support</button>
      </div>

      {/* Integrations */}
      <div className="document-action">
        <button onClick={() => downloadDocument('integrations', 'docx')}>Download Integrations</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('integrations')}>Upload Integrations</button>
      </div>

      {/* Payment and Subscriptions */}
      <div className="document-action">
        <button onClick={() => downloadDocument('payment_and_subscriptions', 'docx')}>Download Payment and Subscriptions</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('payment_and_subscriptions')}>Upload Payment and Subscriptions</button>
      </div>

      {/* Transactions */}
      <div className="document-action">
        <button onClick={() => downloadDocument('transactions', 'docx')}>Download Transactions</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={() => uploadDocument('transactions')}>Upload Transactions</button>
      </div>

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default DocumentEditor;
