import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("daily");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch customers from backend
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/customers/search`,
        {
          params: { search, mode, page, limit },
        }
      );
      setCustomers(response.data.items);
      setTotalPages(response.data.pages);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when query, mode, page, or limit changes
  useEffect(() => {
    fetchCustomers();
  }, [search, mode, page, limit]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="customers-container">
      <h2>Customers</h2>

      <div className="controls">
        {/* <input
          type="text"
          placeholder="Search by name, email, phone or address.. "
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1); // reset page on new search
          }}
        /> */}
        <input
          type="text"
          placeholder="Search by username, email, phone, or address"
          value={search}
          onChange={(e) =>{
             setSearch(e.target.value);
              setPage(1); 
            }}
        />

        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust._id}>
                <td>{cust.username}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.address || "-"}</td>
                <td>{cust.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
