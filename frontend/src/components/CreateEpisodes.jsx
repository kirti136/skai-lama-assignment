import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEpisodes = ({
  isOpen,
  onClose,
  onCreate,
  projectId,
  selectedOption,
}) => {
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setTitle("");
      setTranscript("");
      setError("");
      setFileName("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTranscript(event.target.result);
        setFileName(file.name);
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid .txt file.");
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Episode title cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/episode`,
        {
          projectId,
          name: title,
          transcript,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        onCreate(response.data.episode);
        onClose();
      } else {
        setError("Failed to create episode.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <h2>Create Episode - {selectedOption}</h2>

        <label className="dialog-label">Episode Title:</label>
        <input
          type="text"
          placeholder="Type title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dialog-input"
          disabled={loading}
        />

        <label className="dialog-label">Transcript:</label>

        {selectedOption === "Upload Files" ? (
          <>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              disabled={loading}
              className="dialog-input"
            />
            {fileName && (
              <p style={{ fontSize: "0.85rem", color: "#555" }}>
                Uploaded: <strong>{fileName}</strong>
              </p>
            )}
            <textarea
              rows={6}
              value={transcript}
              readOnly
              className="dialog-input"
              placeholder="File content appears here"
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Type transcript here"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="dialog-input"
            disabled={loading}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="dialog-actions">
          <button onClick={onClose} className="cancel-btn" disabled={loading}>
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="create-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEpisodes;
