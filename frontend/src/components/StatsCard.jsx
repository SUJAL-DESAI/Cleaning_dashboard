import React from "react";
import "./StatsCard.css";

export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
