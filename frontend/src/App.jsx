import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import ProjectPage from "./pages/ProjectPAge";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/project"
        element={
          <PrivateRoute>
            <ProjectPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
