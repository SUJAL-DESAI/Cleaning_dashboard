import React from "react";
import "./Dashboard.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRR4Inlh-w31XtScqmPDWYGTY3urdgCzE",
  authDomain: "home-cleaning-25e4e.firebaseapp.com",
  projectId: "home-cleaning-25e4e",
  storageBucket: "home-cleaning-25e4e.firebasestorage.app",
  messagingSenderId: "653734165095",
  appId: "1:653734165095:web:4176654ef9f09e9bc132c2",
  measurementId: "G-QVGPV99W2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Sales</h3>
          <p>$15,000</p>
        </div>
        <div className="card">
          <h3>Customers</h3>
          <p>1,250</p>
        </div>
        <div className="card">
          <h3>Bookings</h3>
          <p>320</p>
        </div>
        <div className="card">
          <h3>Services</h3>
          <p>18</p>
        </div>
      </div>
    </div>
  );
}
