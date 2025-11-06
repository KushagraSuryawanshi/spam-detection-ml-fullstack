import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// Component to visualize confidence score distribution
export default function ConfidenceChart({ history }) {
  // Define confidence ranges
  const ranges = [
    { range: "0–20%", count: 0 },
    { range: "20–40%", count: 0 },
    { range: "40–60%", count: 0 },
    { range: "60–80%", count: 0 },
    { range: "80–100%", count: 0 },
  ];

  // Categorize prediction confidences into ranges
  history.forEach((h) => {
    const idx = Math.min(Math.floor(h.confidence * 5), 4);
    ranges[idx].count += 1;
  });

  // Custom tooltip for displaying bar details
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isDark = document.documentElement.classList.contains("dark");
      return (
        <div
          style={{
            backgroundColor: isDark ? "#1f2937" : "#f9fafb",
            color: isDark ? "#f9fafb" : "#111827",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "8px 12px",
            fontSize: "0.85rem",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          <p style={{ margin: 0 }}>{label}</p>
          <p
            style={{
              margin: 0,
              color: isDark ? "#a5b4fc" : "#4f46e5",
              fontWeight: 600,
            }}
          >
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Render bar chart visualization
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all flex flex-col items-center justify-center">
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100 self-start">
        Confidence Distribution
      </h3>

      <div className="flex items-center justify-center w-full h-[420px]">
        <ResponsiveContainer width="90%" height="100%">
          <BarChart data={ranges} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="range"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            >
              <Label
                value="Confidence Range"
                position="bottom"
                offset={20}
                style={{
                  fill: "#4b5563",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              />
            </XAxis>
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Number of Predictions",
                angle: -90,
                position: "insideLeft",
                fill: "#4b5563",
                fontSize: 13,
                fontWeight: 600,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
