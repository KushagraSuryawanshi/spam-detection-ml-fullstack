import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function DistributionChart({ history }) {
  const data = [
    { name: "Spam", value: history.filter((h) => h.prediction === "spam").length, color: "#ef4444" },
    { name: "Ham", value: history.filter((h) => h.prediction === "ham").length, color: "#22c55e" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-300">
      <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Spam vs Ham Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
