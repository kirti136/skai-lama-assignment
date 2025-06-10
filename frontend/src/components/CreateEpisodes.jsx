import React, { useState } from "react";
import axios from "axios";

const CreateEpisodes = ({ isOpen, onClose, onCreate, projectId }) => {
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
        setTitle("");
        setTranscript("");
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
        <h2>Create Episode</h2>

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
        <input
          type="text"
          placeholder="Type transcript here"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="dialog-input"
          disabled={loading}
        />

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
