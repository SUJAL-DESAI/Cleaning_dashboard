import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Cleaning Dashboard</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
    </div>
  );
}