// import React, { useEffect, useState } from "react";
// import { fetchServices } from "../api";
// import "./Services.css";

// export default function Services() {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices().then(setServices);
//   }, []);

//   return (
//     <div className="services">
//       <h2>Services</h2>
//       <ul>
//         {services.map((s) => (
//           <li key={s._id}>{s.name} - ${s.price}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import React from "react";
// import "./Services.css";

// export default function Services() {
//   return (
//     <div className="services">
//       <h2>Services</h2>
//       <p>Services management will go here...</p>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Sample JSON data. In a real application, you would fetch this from an API.
const salesData = [
  {
    "email": "customer1@example.com",
    "name": "Simran singh",
    "phone_number": "9876543210",
    "total_price": 500,
    "user_location": "New Delhi, India",
    "status": "Completed",
    "date_time": "2025-08-25T10:30:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12345",
          "og_product_id": "OG67890",
          "product_name": "AC Repair",
          "vendor_details": { "vendor_name": "Cool Home Services", "vendor_id": "V101" },
          "location_booking_time": "2025-08-25T10:00:00Z",
          "item_price": 500
        }
      ]
    }
  },
  {
    "email": "harsh.gupta@example.com",
    "name": "Harsh Gupta",
    "phone_number": "9876509876",
    "total_price": 1500,
    "user_location": "Mumbai, India",
    "status": "In Progress",
    "date_time": "2025-08-24T15:45:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12346",
          "og_product_id": "OG67891",
          "product_name": "Full Home Cleaning",
          "vendor_details": { "vendor_name": "Sparkle Cleaners", "vendor_id": "V102" },
          "location_booking_time": "2025-08-24T15:00:00Z",
          "item_price": 1000
        },
        {
          "product_purchase_id": "PP12347",
          "og_product_id": "OG67892",
          "product_name": "Pest Control",
          "vendor_details": { "vendor_name": "Bug Busters Inc", "vendor_id": "V103" },
          "location_booking_time": "2025-08-24T15:30:00Z",
          "item_price": 500
        }
      ]
    }
  },
  {
    "email": "customer2@example.com",
    "name": "Sanjay Kumar",
    "phone_number": "9988776655",
    "total_price": 800,
    "user_location": "Bangalore, India",
    "status": "Completed",
    "date_time": "2025-08-23T09:15:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12348",
          "og_product_id": "OG67893",
          "product_name": "Deep Cleaning",
          "vendor_details": { "vendor_name": "Shine & Clean", "vendor_id": "V104" },
          "location_booking_time": "2025-08-23T09:00:00Z",
          "item_price": 800
        }
      ]
    }
  },
  {
    "email": "jane.doe@example.com",
    "name": "Jane Doe",
    "phone_number": "9816543210",
    "total_price": 150,
    "user_location": "Pune, India",
    "status": "Completed",
    "date_time": "2025-08-22T14:00:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12349",
          "og_product_id": "OG67894",
          "product_name": "Teeth Whitening",
          "vendor_details": { "vendor_name": "Dental Clinic X", "vendor_id": "V105" },
          "location_booking_time": "2025-08-22T13:45:00Z",
          "item_price": 150
        }
      ]
    }
  },
  {
    "email": "ajun.rao@example.com",
    "name": "Ajay Rao",
    "phone_number": "9887650923",
    "total_price": 4200,
    "user_location": "Chennai, India",
    "status": "Pending",
    "date_time": "2025-08-21T11:20:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12350",
          "og_product_id": "OG67895",
          "product_name": "Car Wash",
          "vendor_details": { "vendor_name": "Clean Auto", "vendor_id": "V106" },
          "location_booking_time": "2025-08-21T11:00:00Z",
          "item_price": 200
        },
        {
          "product_purchase_id": "PP12351",
          "og_product_id": "OG67896",
          "product_name": "Engine Service",
          "vendor_details": { "vendor_name": "Clean Auto", "vendor_id": "V106" },
          "location_booking_time": "2025-08-21T11:10:00Z",
          "item_price": 4000
        }
      ]
    }
  },
  {
    "email": "priya.sharma@example.com",
    "name": "Priya Sharma",
    "phone_number": "9876543210",
    "total_price": 1200,
    "user_location": "Hyderabad, India",
    "status": "Completed",
    "date_time": "2025-08-20T17:30:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12352",
          "og_product_id": "OG67897",
          "product_name": "Plumbing Service",
          "vendor_details": { "vendor_name": "Fix It Right", "vendor_id": "V107" },
          "location_booking_time": "2025-08-20T17:00:00Z",
          "item_price": 1200
        }
      ]
    }
  },
  {
    "email": "rajesh.patel@example.com",
    "name": "Rajesh Patel",
    "phone_number": "9012345678",
    "total_price": 250,
    "user_location": "Ahmedabad, India",
    "status": "Completed",
    "date_time": "2025-08-19T10:00:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12353",
          "og_product_id": "OG67898",
          "product_name": "Electrical Repair",
          "vendor_details": { "vendor_name": "Volt Wizards", "vendor_id": "V108" },
          "location_booking_time": "2025-08-19T09:45:00Z",
          "item_price": 250
        }
      ]
    }
  },
  {
    "email": "anita.desai@example.com",
    "name": "Anita Desai",
    "phone_number": "9123456789",
    "total_price": 900,
    "user_location": "Jaipur, India",
    "status": "In Progress",
    "date_time": "2025-08-18T16:00:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12354",
          "og_product_id": "OG67899",
          "product_name": "Interior Painting",
          "vendor_details": { "vendor_name": "Color Concepts", "vendor_id": "V109" },
          "location_booking_time": "2025-08-18T15:30:00Z",
          "item_price": 900
        }
      ]
    }
  },
  {
    "email": "mohammed.ali@example.com",
    "name": "Mohammed Ali",
    "phone_number": "9234567890",
    "total_price": 1800,
    "user_location": "Lucknow, India",
    "status": "Completed",
    "date_time": "2025-08-17T11:15:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12355",
          "og_product_id": "OG67900",
          "product_name": "Gardening Service",
          "vendor_details": { "vendor_name": "Green Thumb", "vendor_id": "V110" },
          "location_booking_time": "2025-08-17T11:00:00Z",
          "item_price": 1800
        }
      ]
    }
  },
  {
    "email": "pooja.singh@example.com",
    "name": "Pooja Singh",
    "phone_number": "9345678901",
    "total_price": 300,
    "user_location": "Nagpur, India",
    "status": "Pending",
    "date_time": "2025-08-16T14:40:00Z",
    "product_info": {
      "cart": [
        {
          "product_purchase_id": "PP12356",
          "og_product_id": "OG67901",
          "product_name": "Yoga Classes",
          "vendor_details": { "vendor_name": "Mind & Body Studio", "vendor_id": "V111" },
          "location_booking_time": "2025-08-16T14:30:00Z",
          "item_price": 300
        }
      ]
    }
  }
];

// Main App component
export default function SalesSection() {
  // State for search inputs
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [searchPhone, setSearchPhone] = useState(''); 
  
  // State for the filtered data displayed in the table
  const [filteredData, setFilteredData] = useState(salesData);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State to manage the modal visibility and selected product info
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductInfo, setSelectedProductInfo] = useState(null);
  
  // This state is used for the modal's entry and exit animations
  const [showModalContent, setShowModalContent] = useState(false);

  // States for the two new graphs
  const [last7DaysData, setLast7DaysData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);

  // Function to filter the data based on search inputs
  const filterTable = () => {
    const filtered = salesData.filter(sale => {
      const nameMatch = sale.name.toLowerCase().includes(searchName.toLowerCase());
      const emailMatch = sale.email.toLowerCase().includes(searchEmail.toLowerCase());
      const phoneMatch = sale.phone_number.includes(searchPhone);
      const productMatch = sale.product_info.cart.some(item =>
        item.product_name.toLowerCase().includes(searchProduct.toLowerCase())
      );
      return nameMatch && emailMatch && productMatch && phoneMatch;
    });
    setFilteredData(filtered);
  };

  // Function to process sales data for the graphs
  const processGraphData = () => {
    // 1. Process data for the last 7 days graph
    const dailySales = {};
    salesData.forEach(sale => {
      const date = new Date(sale.date_time).toISOString().slice(0, 10);
      dailySales[date] = (dailySales[date] || 0) + sale.total_price;
    });

    const sortedDates = Object.keys(dailySales).sort();
    const last7Dates = sortedDates.slice(-7);
    const last7DaysGraphData = last7Dates.map(date => {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.getMonth() + 1; // Month is 0-indexed
      return {
        formattedDate: `D${day}-M${month}`,
        sales: dailySales[date],
      };
    });
    setLast7DaysData(last7DaysGraphData);

    // 2. Process data for the monthly progress graph
    const monthlySales = {};
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Get the current month number

    salesData.forEach(sale => {
      const saleDate = new Date(sale.date_time);
      if (saleDate.getMonth() === today.getMonth() && saleDate.getFullYear() === today.getFullYear()) {
        const day = saleDate.getDate();
        monthlySales[day] = (monthlySales[day] || 0) + sale.total_price;
      }
    });

    const monthlyGraphData = Object.keys(monthlySales).sort((a, b) => a - b).map(day => ({
      formattedDate: `D${day}-M${currentMonth}`,
      sales: monthlySales[day],
    }));
    setMonthlySalesData(monthlyGraphData);
  };

  // useEffect hook to run the filter and graph processing functions whenever search inputs change
  useEffect(() => {
    filterTable();
    processGraphData();
    // Reset to the first page whenever the filter changes
    setCurrentPage(1);
  }, [searchName,searchPhone, searchEmail, searchProduct]);

  // Pagination logic to calculate data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Function to show the modal with product details
  const showProductInfo = (productInfo) => {
    setSelectedProductInfo(productInfo);
    setModalOpen(true);
    // Trigger the fade-in animation after a short delay
    setTimeout(() => {
      setShowModalContent(true);
    }, 50);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModalContent(false);
    // Trigger the fade-out after the animation completes
    setTimeout(() => {
      setModalOpen(false);
      setSelectedProductInfo(null);
    }, 300);
  };

  // Render the component
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales Dashboard</h2>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Last 7 Days Sales Graph */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Last 7 Days Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={last7DaysData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Sales Progress Graph */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Sales Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySalesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <hr className="my-6 border-gray-300"/>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales Records</h2>

        {/* Search and filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Search by Name"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Search by Phone"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Email"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.y.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Product"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button
            onClick={filterTable}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            Search
          </button>
        </div>

        {/* Sales Table */}
        <div className="table-container bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-xl">
                <th className="py-3 px-6 border-b border-gray-200 rounded-tl-xl">Name</th>
                <th className="py-3 px-6 border-b border-gray-200">Email</th>
                <th className="py-3 px-6 border-b border-gray-200">Phone</th>
                <th className="py-3 px-6 border-b border-gray-200">Product</th>
                <th className="py-3 px-6 border-b border-gray-200">Details</th>
                <th className="py-3 px-6 border-b border-gray-200">Location</th>
                <th className="py-3 px-6 border-b border-gray-200">Status</th>
                <th className="py-3 px-6 border-b border-gray-200">Price</th>
                <th className="py-3 px-6 border-b border-gray-200 rounded-tr-xl">Date/Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {/* Map through the current data for the table rows */}
              {currentData.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="py-4 px-6">{sale.name}</td>
                  <td className="py-4 px-6">{sale.email}</td>
                  <td className="py-4 px-6">{sale.phone_number}</td>
                  <td className="py-4 px-6">{sale.product_info.cart.map(item => item.product_name).join(', ')}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => showProductInfo(sale.product_info)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="py-4 px-6">{sale.user_location}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`${sale.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'} py-1 px-3 rounded-full text-xs font-semibold`}
                    >
                      {sale.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">₹{sale.total_price}</td>
                  <td className="py-4 px-6">{new Date(sale.date_time).toLocaleString()}</td>
                </tr>
              ))}
              {/* Show a message if no data is found */}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-4 px-6 text-center text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl transition-colors duration-200 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Product Info Modal (conditionally rendered) */}
      {modalOpen && selectedProductInfo && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-xl p-8 shadow-2xl relative w-full md:w-3/4 lg:w-1/2 transition-all duration-300 ease-in-out ${showModalContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <span
              onClick={closeModal}
              className="absolute top-4 right-4 text-3xl font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              &times;
            </span>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h3>
            <div className="overflow-y-auto max-h-[70vh]">
              <table className="w-full text-left table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 border-b border-gray-200 rounded-tl-xl">Purchase ID</th>
                    <th className="py-3 px-6 border-b border-gray-200">Product ID</th>
                    <th className="py-3 px-6 border-b border-gray-200">Product Name</th>
                    <th className="py-3 px-6 border-b border-gray-200">Vendor Name</th>
                    <th className="py-3 px-6 border-b border-gray-200">Booking Time</th>
                    <th className="py-3 px-6 border-b border-gray-200 rounded-tr-xl">Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {/* Map through the selected product's cart to display details */}
                  {selectedProductInfo.cart.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="py-4 px-6">{item.product_purchase_id}</td>
                      <td className="py-4 px-6">{item.og_product_id}</td>
                      <td className="py-4 px-6">{item.product_name}</td>
                      <td className="py-4 px-6">{item.vendor_details.vendor_name}</td>
                      <td className="py-4 px-6">{new Date(item.location_booking_time).toLocaleString()}</td>
                      <td className="py-4 px-6">₹{item.item_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
