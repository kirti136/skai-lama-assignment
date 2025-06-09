import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo_purple from "../assets/logo_purple.png";
import logo_white from "../assets/logo_white no bg.png";
import bg from "../assets/bg.png";
import { FcGoogle } from "react-icons/fc";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });

      console.log("ertyui", res.data);
      Cookies.set("token", res.data.token, { expires: 7 });

      navigate("/project", { state: { userData: res.data.user } });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      {/* Left Panel */}
      <div
        className="left-panel"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "60px",
            }}
          >
            <img
              src={logo_white}
              alt="Logo"
              style={{ height: 70, marginBottom: 0 }}
            />
            <h2
              style={{
                fontSize: "40px",
                lineHeight: "109%",
                margin: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "700", fontFamily: "Roboto" }}>
                Ques.
              </span>
              <span style={{ fontWeight: "400", marginLeft: "2px" }}>AI</span>
            </h2>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 400,
              marginBottom: 40,
              maxWidth: 600,
              fontFamily: "Montserrat",
              lineHeight: "1.2",
            }}
          >
            Your podcast will no longer be just a hobby.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "2rem",
              maxWidth: 600,
              fontFamily: "Montserrat",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0.5px",
            }}
          >
            Supercharge Your Distribution using our AI assistant!
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <img
            src={logo_purple}
            alt="Logo"
            style={{ height: 100, marginBottom: 10 }}
          />
          <h2
            style={{
              color: "#7E22CE",
              fontFamily: "Roboto",
              fontWeight: 300,
              fontSize: "44.72px",
              lineHeight: "109%",
              letterSpacing: "0%",
              textAlign: "center",
            }}
          >
            Welcome to <br />
            <span
              style={{
                fontFamily: "Roboto",
                fontWeight: 600,
                fontSize: "44.72px",
                lineHeight: "109%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              Ques.AI
            </span>
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            maxWidth: 360,
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
            fontFamily: "Roboto",
          }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <div
            style={{
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: 6 }} /> Remember me
            </label>
            <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#7E22CE",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            Login
          </button>
          {error && (
            <p
              style={{
                color: "red",
                marginTop: "-12px",
                marginBottom: "16px",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}
        </form>

        {/* Divider */}
        <div
          style={{
            margin: "16px 0",
            width: "100%",
            maxWidth: 360,
            textAlign: "center",
          }}
        >
          <hr style={{ borderTop: "1px solid #ccc" }} />
          <span
            style={{
              position: "relative",
              top: "-12px",
              backgroundColor: "#f4f4f4",
              padding: "0 10px",
              fontSize: 14,
            }}
          >
            or
          </span>
        </div>

        {/* Google Login */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            maxWidth: 360,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <FcGoogle size={25} />
          <span
            style={{
              fontWeight: 600,
              letterSpacing: "0.2px",
              color: "#5D5F61",
            }}
          >
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#1976d2",
              textDecoration: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
