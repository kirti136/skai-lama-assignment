import React, { useState } from "react";
import axios from "axios";

const CreateProjectDialog = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (title.trim() === "") {
      setError("Project title cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/project`,
        { title },
        { withCredentials: true }
      );

      if (response.data.success) {
        const project = response.data.project;
        onCreate(project);
        setTitle("");
        onClose();
      } else {
        setError("Failed to create project.");
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
        <h2>Create Project</h2>

        <label htmlFor="projectTitle" className="dialog-label">
          Enter project name:
        </label>
        <input
          id="projectTitle"
          type="text"
          placeholder="Type here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dialog-input"
          disabled={loading}
        />

        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

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

export default CreateProjectDialog;
