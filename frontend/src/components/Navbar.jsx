import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Cleaning Dashboard</h1>
      <div className="user-info">
        <span>Welcome, Admin</span>
      </div>
    </nav>
  );
}
