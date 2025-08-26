// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Bookings() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/bookings")
//       .then(res => setBookings(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Bookings</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((b, i) => (
//             <tr key={i}>
//               <td>{b.customer?.username}</td>
//               <td>{b.customer?.email}</td>
//               <td>{b.customer?.phone}</td>
//               <td>{new Date(b.createdAt).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./bookings.css";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings") // backend endpoint
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.toLowerCase().includes(search.toLowerCase()) ||
      b.service?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bookings-page">
      <h1>Bookings Overview</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by email, phone, or service"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Bookings Table */}
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((b, i) => (
            <tr key={i}>
              <td>{b.email}</td>
              <td>{b.phone}</td>
              <td>{b.service}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Booking Graphs */}
      <div className="bookings-graphs">
        <h2>Daily / Weekly / Monthly Bookings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#1f78d6" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#001d3d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
