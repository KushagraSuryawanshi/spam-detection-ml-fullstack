import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Component to display spam vs ham distribution
export default function DistributionChart({ history }) {
  // Prepare data for pie chart based on prediction results
  const data = [
    {
      name: "Spam",
      value: history.filter((h) => h.prediction === "spam").length,
      color: "#ef4444",
    },
    {
      name: "Ham",
      value: history.filter((h) => h.prediction === "ham").length,
      color: "#22c55e",
    },
  ];

  // Define tooltip styling based on theme
  const tooltipStyle = {
    backgroundColor:
      document.documentElement.classList.contains("dark") ? "#1f2937" : "#f9fafb",
    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.85rem",
  };

  // Render pie chart visualization
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all">
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Spam vs Ham Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
