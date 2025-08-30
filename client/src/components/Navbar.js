import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <nav className="navbar">
      <Link to="/" className="neon-title">Arcade</Link>
      <div>
        {token ? (
          <button onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}