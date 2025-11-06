import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Component to visualize prediction confidence over time
export default function TimelineChart({ history }) {
  // Prepare the last 10 predictions for timeline visualization
  const data = history.slice(0, 10).reverse().map((h, i) => ({
    id: i + 1,
    confidence: h.confidence,
  }));

  // Define tooltip styling based on dark/light mode
  const tooltipStyle = {
    backgroundColor:
      document.documentElement.classList.contains("dark") ? "#1f2937" : "#f9fafb",
    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.85rem",
  };

  // Render line chart visualization
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all">
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Prediction Timeline
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="id" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
