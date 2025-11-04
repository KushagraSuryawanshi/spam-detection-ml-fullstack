import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ConfidenceChart({ history }) {
  const bins = [
    { range: "0-20%", count: history.filter((h) => h.confidence < 20).length },
    { range: "20-40%", count: history.filter((h) => h.confidence >= 20 && h.confidence < 40).length },
    { range: "40-60%", count: history.filter((h) => h.confidence >= 40 && h.confidence < 60).length },
    { range: "60-80%", count: history.filter((h) => h.confidence >= 60 && h.confidence < 80).length },
    { range: "80-100%", count: history.filter((h) => h.confidence >= 80).length },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-300">
      <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Confidence Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bins}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
