import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProjectPage.css";
import logo from "../assets/logo_purple.png";
import { FaRegBell, FaCirclePlus } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import bg from "../assets/projectDashboard.png";
import CreateProjectDialog from "../components/CreateProjectDialog";
import { Link } from "react-router-dom";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const colors = [
        "#f87171", // red
        "#fb923c", // orange
        "#facc15", // yellow
        "#34d399", // green
        "#60a5fa", // blue
        "#a78bfa", // purple
        "#f472b6", // pink
      ];

      const formattedProjects = response.data.projects.map((project) => ({
        id: project._id,
        title: project.title,
        files: project.epCount || 0,
        lastEdited: new Date(project.updatedAt).toLocaleDateString(),
        initials: project.title
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        width: "90%",
        margin: "auto",
        fontFamily: "Roboto",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 0 0 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img src={logo} alt="Logo" style={{ height: "4rem" }} />
          <h2
            style={{
              fontSize: "40px",
              margin: 0,
              display: "flex",
              alignItems: "center",
              color: "#7e22ce",
            }}
          >
            <span style={{ fontWeight: "500", fontFamily: "Roboto" }}>
              Ques.
            </span>
            <span style={{ fontWeight: "300", marginLeft: "2px" }}>AI</span>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MdOutlineSettings size={30} color="#525456" />
          <FaRegBell size={25} color="#525456" />
        </div>
      </div>

      <div style={{ padding: "2rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: projects.length > 0 ? "1.8rem" : "3rem",
              fontWeight: "bold",
              color: "#7e22ce",
              textAlign: projects.length > 0 ? "left" : "center",
              width: "100%",
            }}
          >
            {projects.length > 0 ? "Projects" : "Create a New Project"}
          </div>

          {projects.length > 0 && (
            <button
              onClick={() => setIsDialogOpen(true)}
              style={{
                backgroundColor: "#211631",
                fontFamily: "Roboto",
                fontWeight: 500,
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "0 auto",
                fontSize: "1rem",
                minWidth: "14rem",
              }}
            >
              <FaCirclePlus size={20} />
              Create New Project
            </button>
          )}
        </div>

        {/* Main content */}
        {projects.length === 0 ? (
          <div
            style={{ textAlign: "center", maxWidth: "50rem", margin: "0 auto" }}
          >
            <img
              src={bg}
              alt="Create Project"
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "0 auto 1.5rem",
              }}
            />

            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              style={{
                backgroundColor: "#211631",
                fontFamily: "Roboto",
                fontWeight: 500,
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "0 auto",
                fontSize: "1rem",
              }}
            >
              <FaCirclePlus size={20} />
              Create New Project
            </button>
          </div>
        ) : (
          <div className="grid-responsive">
            {projects.map((project) => (
              <Link
                to="/upload"
                state={{ project }}
                key={project.id}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                      borderRadius: "0.375rem",
                      backgroundColor: project.color,
                    }}
                  >
                    {project.initials}
                  </div>
                  <div>
                    <div style={{ color: "#7e22ce", fontWeight: "600" }}>
                      {project.title}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {project.files} Files
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      Last edited {project.lastEdited}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Dialog */}
        <CreateProjectDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onCreate={fetchProjects}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
