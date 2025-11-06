import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function PerformanceChart({ stats }) {
  if (!stats) return null;

  // Utility: round to 2 decimals safely
  const round2 = (n) => Math.round((n || 0) * 10000) / 100;

  // Data for radar chart
  const data = [
    { metric: "Accuracy", value: round2(stats.accuracy) },
    { metric: "Precision", value: round2(stats.precision) },
    { metric: "Recall", value: round2(stats.recall) },
    { metric: "F1 Score", value: round2(stats.f1_score) },
  ];

  // Tooltip styling for dark/light mode
  const tooltipStyle = {
    backgroundColor:
      document.documentElement.classList.contains("dark") ? "#1f2937" : "#f9fafb",
    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.85rem",
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={tooltipStyle} className="p-2">
          <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
          <p style={{ margin: 0, color: "#6366f1" }}>
            Performance: {payload[0].value.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all flex flex-col items-center justify-center">
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100 self-start">
        Model Performance Overview
      </h3>

      <div className="flex items-center justify-center w-full h-[420px]">
        <ResponsiveContainer width="90%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#d1d5db" />
            <PolarAngleAxis
              dataKey="metric"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.6}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
