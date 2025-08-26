import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import "./Sales.css";
import SalesBarChart from "../components/SalesBarChart";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");

  // Chart Data
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  const fetchSales = async () => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(product && { product }),
      });

      const res = await fetch(`http://localhost:5000/api/sales?${params}`);
      const data = await res.json();
      setSales(data.sales);
      setTotalPages(data.pages);

      // Process for charts
      processSalesData(data.sales);
    } catch (err) {
      console.error(err);
    }
  };

  const processSalesData = (data) => {
    // --- Daily (by hours 0–23) ---
    let dailyArr = Array.from({ length: 25 }, (_, i) => ({
      hour: `${i}:00`,
      amount: 0,
    }));

    // --- Weekly (Mon–Sun) ---
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let weeklyArr = days.map((d) => ({ day: d, amount: 0 }));

    // --- Monthly (Week-1 to Week-4) ---
    let monthlyArr = [
      { week: "Week-1", amount: 0 },
      { week: "Week-2", amount: 0 },
      { week: "Week-3", amount: 0 },
      { week: "Week-4", amount: 0 },
    ];

    data.forEach((sale) => {
      const date = new Date(sale.purchaseDate || sale.bookingDate);

      // Daily
      let h = date.getHours();
      dailyArr[h].amount += sale.amount;

      // Weekly
      let d = (date.getDay() + 6) % 7; // JS: 0=Sun → shift to 6
      weeklyArr[d].amount += sale.amount;

      // Monthly
      let weekNum = Math.ceil(date.getDate() / 7) - 1;
      if (weekNum >= 0 && weekNum < 4) {
        monthlyArr[weekNum].amount += sale.amount;
      }
    });

    setDaily(dailyArr);
    setWeekly(weeklyArr);
    setMonthly(monthlyArr);
  };

  useEffect(() => {
    fetchSales();
    const interval = setInterval(fetchSales, 5000); 
    return () => clearInterval(interval);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchSales();
  };

  return (
    
    <div className="sales-container">
            {/* Sales Charts */}
      <div className="charts-container">
        <SalesBarChart title="Daily Sales (by Hour)" data={daily} xKey="hour" yKey="amount" />
        <SalesBarChart title="Weekly Sales (by Day)" data={weekly} xKey="day" yKey="amount" />
        <SalesBarChart title="Monthly Sales (by Week)" data={monthly} xKey="week" yKey="amount" />
      </div>
      <h1 className="sales-title">Sales Records</h1>

      {/* Search Filters */}
      <form onSubmit={handleSearch} className="sales-search-form">
        <input
          type="text"
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="sales-input"
        />
        <input
          type="text"
          placeholder="Search by Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sales-input"
        />
        <input
          type="text"
          placeholder="Search by Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="sales-input"
        />
        <input
          type="text"
          placeholder="Search by Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="sales-input"
        />
        <button type="submit" className="sales-btn">Search</button>
      </form>

      {/* Sales Table */}
      <div className="sales-table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Product Info</th>
              <th>Booking Date</th>
              <th>Purchase Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.customerName}</td>
                <td>{sale.customerEmail}</td>
                <td>{sale.customerPhone}</td>
                <td>{sale.product}</td>
                <td>{sale.productInfo}</td>
                <td>{new Date(sale.bookingDate).toLocaleDateString()}</td>
                <td>{new Date(sale.purchaseDate).toLocaleDateString()}</td>
                <td>₹{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="sales-pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="sales-btn"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="sales-btn"
        >
          Next
        </button>
      </div>
    </div>  
  );
}
