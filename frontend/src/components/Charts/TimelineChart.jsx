import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TimelineChart({ history }) {
  const data = history.slice(0, 10).reverse().map((h, i) => ({
    id: i + 1,
    confidence: h.confidence,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-300">
      <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Prediction Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="confidence" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
