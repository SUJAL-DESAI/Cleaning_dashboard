// frontend/src/api.js
const API_URL = "http://localhost:5000/api";

export const fetchBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
};

export const fetchCustomers = async (search, period) => {
  let url = `${API_URL}/customers`;
  const params = [];
  if (search) params.push(`search=${encodeURIComponent(search)}`);
  if (period) params.push(`period=${period}`);
  if (params.length) url += `?${params.join("&")}`;
  const res = await fetch(url);
  return res.json();
};

export const fetchServices = async () => {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
};
