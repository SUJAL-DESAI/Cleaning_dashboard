import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const SalesBarChart = ({ title, data, xKey, yKey }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[40%]">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <ResponsiveContainer width="150%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip formatter={(value) => `${value}`} />
          <Bar dataKey={yKey} fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
