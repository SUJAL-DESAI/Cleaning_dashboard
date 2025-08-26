import React, { useEffect, useState } from "react";
import "./Sales.css";
import SalesBarChart from "../components/SalesBarChart";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [username, setUsername] = useState("");

    // Chart Data
    const [daily, setDailyData] = useState([]);
    const [weekly, setWeeklyData] = useState([]);
    const [monthly, setMonthlyData] = useState([]);

    const fetchUsers = async () => {
        try {
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...(email && { email }),
                ...(location && { location }),
                ...(mobileNumber && { mobileNumber }),
                ...(username && { username }),
            });

            const res = await fetch(`http://localhost:5000/api/users?${params}`);
            const data = await res.json();
            setUsers(data.users);
            setTotalPages(data.pages);
        } catch (err) {
            console.error(err);
        }
    };

    // const fetchCharts = async () => {
    //     try {
    //         const res = await fetch("http://localhost:5000/api/users");
    //         const data = await res.json();
    //         setDailyData(data.daily || []);
    //         setWeeklyData(data.weekly || []);
    //         setMonthlyData(data.monthly || []);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    const fetchCharts = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();

        // 👇 assume your backend sends an array of users in `data.users`
        const users = data.users || [];

        // --- Daily (by created hour) ---
        const dailyMap = {};
        users.forEach((u) => {
            const date = new Date(u.createdAt);
            const hour = date.getHours();
            const label = `${hour}:00`;
            dailyMap[label] = (dailyMap[label] || 0) + 1;
        });
        const dailyData = Object.keys(dailyMap).map((hour) => ({
            hour,
            amount: dailyMap[hour],
        }));

        // --- Weekly (by weekday) ---
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weeklyMap = {};
        users.forEach((u) => {
            const date = new Date(u.createdAt);
            const day = days[date.getDay()];
            weeklyMap[day] = (weeklyMap[day] || 0) + 1;
        });
        const weeklyData = Object.keys(weeklyMap).map((day) => ({
            day,
            amount: weeklyMap[day],
        }));

        // --- Monthly (by week number) ---
        const monthlyMap = {};
        users.forEach((u) => {
            const date = new Date(u.createdAt);
            const week = Math.ceil(date.getDate() / 7); // 1–4 weeks in a month
            const label = `Week ${week}`;
            monthlyMap[label] = (monthlyMap[label] || 0) + 1;
        });
        const monthlyData = Object.keys(monthlyMap).map((week) => ({
            week,
            amount: monthlyMap[week],
        }));

        // ✅ update state
        setDailyData(dailyData);
        setWeeklyData(weeklyData);
        setMonthlyData(monthlyData);

    } catch (err) {
        console.error(err);
    }
   };


    useEffect(() => {
        fetchUsers();
        fetchCharts();
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchUsers();
    };

    return (
        <div className="sales-container">
            {/* Sales Charts */}
            <div className="charts-container">
                <SalesBarChart title="Daily Users (by Hour)" data={daily} xKey="hour" yKey="amount" />
                <SalesBarChart title="Weekly Users (by Day)" data={weekly} xKey="day" yKey="amount" />
                <SalesBarChart title="Monthly Users (by Week)" data={monthly} xKey="week" yKey="amount" />
            </div>
            <h1 className="sales-title">Users Records</h1>

            {/* Search Filters */}
            <form onSubmit={handleSearch} className="sales-search-form">
                <input
                    type="text"
                    placeholder="Search by Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sales-input"
                />
                <input
                    type="text"
                    placeholder="Search by Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="sales-input"
                />
                <input
                    type="text"
                    placeholder="Search by Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="sales-input"
                />
                <input
                    type="text"
                    placeholder="Search by Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="sales-input"
                />
                <button type="submit" className="sales-btn">Search</button>
            </form>

            {/* Users Table */}
            <div className="sales-table-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Mobile Number</th>
                            <th>OTP</th>
                            <th>Pincode</th>
                            <th>Token</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id || user.email}>
                                    <td>{user.email || "—"}</td>
                                    <td>{user.location || "—"}</td>
                                    <td>{user.mobileNumber || "—"}</td>
                                    <td>{user.otp || "—"}</td>
                                    <td>{user.pincode || "—"}</td>
                                    <td>{user.token || "—"}</td>
                                    <td>{user.username || "—"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    No users found
                                </td>
                            </tr>
                        )}

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
