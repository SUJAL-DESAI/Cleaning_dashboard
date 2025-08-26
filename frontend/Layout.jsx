// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}
