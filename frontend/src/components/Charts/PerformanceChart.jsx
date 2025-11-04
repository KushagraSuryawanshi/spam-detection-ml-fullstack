import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PerformanceChart({ stats }) {
  const data = [
    { metric: "Accuracy", value: stats.accuracy * 100 },
    { metric: "Precision", value: stats.precision * 100 },
    { metric: "Recall", value: stats.recall * 100 },
    { metric: "F1-Score", value: stats.f1_score * 100 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-300">
      <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Model Performance Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
