import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ Import the centralized apiClient
import apiClient from "../api.js"; // Adjust path if needed
import "./Auth.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // ✅ Use the apiClient for a clean, maintainable request
      const res = await apiClient.post("/auth/login", {
        username,
        password,
      });

      // Store user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data._id);

      // Navigate based on user role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/golu.gif" alt="Cute Character" className="auth-mascot" />
        <h1>Login to Saathi</h1>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <span className="auth-link">
          Don’t have an account? <a href="/signup">Sign up now!</a>
        </span>
      </div>
    </div>
  );
};

export default Login;

