import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const EditTranscript = ({ selectedEpisode, setSelectedEpisode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState(
    selectedEpisode.transcript
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleDiscard = () => {
    setEditedTranscript(selectedEpisode.transcript);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.put(
        `https://skai-lama-assignment-4swq.onrender.com/api/episode/${
          selectedEpisode._id || selectedEpisode.id
        }`,
        { transcript: editedTranscript },
        {
          withCredentials: true,
        }
      );

      selectedEpisode.transcript = editedTranscript;
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update transcript:", error);
      alert("Failed to save transcript. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="editTranscript"
      style={{
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        {/* Back arrow */}
        <button
          onClick={() => setSelectedEpisode(null)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem",
            color: "#000",
            padding: "0",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Back to Podcasts"
        >
          <FaArrowLeft />
        </button>

        {/* Heading */}
        <h2
          style={{ flexGrow: 1, margin: 0, fontWeight: "bold", color: "#222" }}
        >
          Edit Transcript
        </h2>

        {/* Edit / Save/Discard buttons */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#000")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
          >
            Edit
          </button>
        ) : (
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleDiscard}
              disabled={isSaving}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "transparent",
                color: "#dc2626",
                border: "2px solid #dc2626",
                borderRadius: "6px",
                cursor: isSaving ? "not-allowed" : "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#dc2626";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#dc2626";
              }}
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: isSaving ? "#555" : "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: isSaving ? "not-allowed" : "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => {
                if (!isSaving) e.target.style.backgroundColor = "#222";
              }}
              onMouseOut={(e) => {
                if (!isSaving) e.target.style.backgroundColor = "#000";
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* textarea */}
      {!isEditing ? (
        <p
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#f9fafb",
            padding: "1rem",
            borderRadius: "8px",
            minHeight: "200px",
            color: "#333",
          }}
        >
          {selectedEpisode.transcript}
        </p>
      ) : (
        <textarea
          value={editedTranscript}
          onChange={(e) => setEditedTranscript(e.target.value)}
          rows={10}
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            fontFamily: "inherit",
            resize: "vertical",
            minHeight: "200px",
          }}
        />
      )}
    </div>
  );
};

export default EditTranscript;
