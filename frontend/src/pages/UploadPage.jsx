import {  FaYoutube, FaUpload } from "react-icons/fa";
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

const UploadPage = () => {
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
              }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>Username</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                user@email.com
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
            }}
          >
            <IoHomeOutline /> Home Page / Sample Project /{" "}
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
              {/* Text on left */}
              <div>
                <h4 style={{ margin: 0, fontSize: "20px", color: "#111827" ,marginBottom:"0.2rem"}}>
                  {title}
                </h4>
                <p style={{ margin: 0, fontSize: "15px", color: "#6b7280" }}>
                  Lorem ipsum dolor sit. Dolor lorem sit.
                </p>
              </div>

              {/* Icon on right with colored background */}
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
            Select a file or drag and drop here (Podcast Media or Transcription
            Text)
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7e22ce")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#9333ea")}
          >
            Select File
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
