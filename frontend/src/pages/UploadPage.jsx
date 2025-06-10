import { useEffect, useState } from "react";
import axios from "axios";
import { FaYoutube, FaUpload } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import logo from "../assets/logo_purple.png";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus, FaPencil } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { RiVipDiamondLine } from "react-icons/ri";
import { RiShare2Fill } from "react-icons/ri";
import { SiRss } from "react-icons/si";
import { useLocation } from "react-router-dom";
import CreateEpisodes from "../components/CreateEpisodes";
import EditTranscript from "../components/EditTranscript";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const project = location.state?.project;
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const projectId = project?.id;
        if (!projectId) return;

        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/episode/p?projectId=${projectId}`,
          {
            withCredentials: true,
          }
        );
        setEpisodes(res.data.episodes || []);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [project]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/me`,
          {
            withCredentials: true,
          }
        );
        setUserData(res.data.user || []);
      } catch (error) {
        console.error("Error fetching userData:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleDelete = async (episodeId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/episode/${episodeId}`,
        {
          withCredentials: true,
        }
      );
      setEpisodes((prev) => prev.filter((ep) => ep._id !== episodeId));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete episode.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateEpisode = (newEpisode) => {
    setEpisodes((prev) => [...prev, newEpisode]);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
      }}
      id="upload-page"
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "320px",
          backgroundColor: "#f9fafb",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        id="sidebar"
      >
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            padding: "0 0 1rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
            <h2 style={{ fontSize: "25px", margin: 0 }}>
              <span style={{ color: "#7e22ce", fontWeight: "bold" }}>
                Ques.
              </span>
              <span style={{ color: "#7e22ce", fontWeight: 300 }}>AI</span>
            </h2>
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              fontSize: "14px",
            }}
          >
            {[
              {
                icon: <FaPlus />,
                text: "Add your Podcast(s)",
                active: true,
              },
              {
                icon: <FaPencil />,
                text: "Create & Repurpose",
              },
              {
                icon: <GoCopy />,
                text: "Podcast Widget",
              },
              {
                icon: <RiVipDiamondLine />,
                text: "Upgrade",
              },
            ].map(({ icon, text, active }) => (
              <a
                key={text}
                href="#"
                style={{
                  color: active ? "#7e22ce" : "#374151",
                  textDecoration: "none",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: active ? "#ede9fe" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 500,
                }}
              >
                {icon}
                {text}
              </a>
            ))}
          </nav>
        </div>

        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#6b7280",
              fontSize: "14px",
              textDecoration: "none",
              padding: "0.8rem 0.5rem",
              transition: "color 0.2s ease",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <MdOutlineSettings />
            Help
          </a>

          <a
            href="#"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#6b7280",
              fontSize: "14px",
              textDecoration: "none",
              padding: "0.8rem 0.5rem",
              transition: "color 0.2s ease",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <CiLogout />
            Logout
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            {userData?.imageUrl ? (
              <img
                src={userData.imageUrl}
                alt="User"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#9333ea",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  userSelect: "none",
                }}
              >
                {userData.email ? userData.email.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>
                {userData.username || "Username"}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                {userData.email || "user@email.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "2rem 3rem",
          backgroundColor: "#fff",
        }}
        id="main-content"
      >
        {/* Top bar with breadcrumb and icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* Breadcrumb */}

          <p
            style={{
              display: "flex",
              fontSize: "14px",
              color: "#6b7280",
              alignItems: "center",
              gap: "0.5rem",
              margin: 0,
              cursor: "pointer",
            }}
          >
            <Link
              to={`/project`}
              style={{
                textDecoration: "none",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <IoHomeOutline /> Home Page / {project?.title || "Sample Project"}{" "}
              /
            </Link>
            <span style={{ color: "#9333ea", fontWeight: 500 }}>
              Add your podcast
            </span>
          </p>

          {/* Top Right Icons */}
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
            }}
          >
            <FaRegBell size={20} color="#525456" />
            <RiShare2Fill size={25} color="#525456" />
          </div>
        </div>

        {/* Add Podcast */}
        {!selectedEpisode ? (
          <div className="addPodcast">
            {/* Title */}
            <h2
              style={{
                fontSize: "24px",
                color: "#111827",
                fontWeight: 600,
                marginBottom: "2rem",
              }}
            >
              Add Podcast
            </h2>

            {/* Option Cards */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
              id="upload-options"
            >
              {[
                {
                  icon: <SiRss size={40} color="#ffffff" />,
                  title: "RSS Feed",
                  bgColor: "#F97316", // orange
                },
                {
                  icon: <FaYoutube size={40} color="#ffffff" />,
                  title: "Youtube Video",
                  bgColor: "#EF4444", // red
                },
                {
                  icon: <FaUpload size={40} color="#ffffff" />,
                  title: "Upload Files",
                  bgColor: "#8B5CF6", // violet
                },
              ].map(({ icon, title, bgColor }) => (
                <div
                  key={title}
                  onClick={handleOpenModal}
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "1rem",
                    boxShadow: "0 5px 6px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #f3f4f6",
                    cursor: "pointer",
                  }}
                >
                  {/* Left */}
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#111827",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      style={{ margin: 0, fontSize: "15px", color: "#6b7280" }}
                    >
                      Lorem ipsum dolor sit. Dolor lorem sit.
                    </p>
                  </div>

                  {/* Right */}
                  <div
                    style={{
                      backgroundColor: bgColor,
                      borderRadius: "8px",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    {icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Box */}
            {/* Conditional Render: Table or Upload Box */}
            {loading ? (
              <p>Loading...</p>
            ) : episodes.length > 0 ? (
              <div
                style={{
                  overflowX: "auto",
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0 12px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f3f4f6",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        No.
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Name
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Upload Date & Time
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {episodes.map((ep, index) => {
                      const date = new Date(ep.createdAt);
                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      });
                      const formattedTime = date.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      });

                      return (
                        <tr
                          key={ep._id}
                          style={{
                            background: "#ffffff",
                            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
                            borderRadius: "8px",
                          }}
                        >
                          <td
                            style={{
                              padding: "0.75rem",
                              borderTopLeftRadius: "8px",
                              borderBottomLeftRadius: "8px",
                              fontWeight: 600,
                              color: "#71767A",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textTransform: "uppercase",
                              fontWeight: 600,
                              color: "#71767A",
                            }}
                          >
                            {ep.name}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              whiteSpace: "nowrap",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#71767A",
                            }}
                          >
                            {formattedDate} | {formattedTime}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              borderTopRightRadius: "8px",
                              borderBottomRightRadius: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "inline-flex",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                overflow: "hidden",
                              }}
                            >
                              <button
                                style={{
                                  padding: "5px 12px",
                                  border: "none",
                                  backgroundColor: "white",
                                  color: "#111827",
                                  fontSize: "13px",
                                  borderRight: "1px solid #d1d5db",
                                  cursor: "pointer",
                                }}
                                onClick={() => setSelectedEpisode(ep)}
                              >
                                View
                              </button>
                              <button
                                style={{
                                  padding: "4px 12px",
                                  border: "none",
                                  backgroundColor: "white",
                                  color: "#ef4444",
                                  fontSize: "13px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDelete(ep._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  border: "2px dashed #e5e7eb",
                  padding: "2.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                }}
              >
                <FiUploadCloud size={40} color="#9333EA" />
                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "1rem",
                    color: "#374151",
                  }}
                >
                  Select a file or drag and drop here (Podcast Media or
                  Transcription Text)
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    marginBottom: "1.5rem",
                  }}
                >
                  MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                </p>
                <button
                  style={{
                    backgroundColor: "#9333ea",
                    color: "#fff",
                    padding: "0.6rem 1.25rem",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#7e22ce")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#9333ea")
                  }
                >
                  Select File
                </button>
              </div>
            )}
          </div>
        ) : (
          <EditTranscript
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
          />
        )}
      </div>

      {/* Dialouge Box */}
      <CreateEpisodes
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateEpisode}
        projectId={project?.id}
      />
    </div>
  );
};

export default UploadPage;
