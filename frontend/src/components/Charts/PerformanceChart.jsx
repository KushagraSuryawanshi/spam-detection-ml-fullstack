import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Download } from "lucide-react";
import { exportChartToCSV } from "../../utils/exportUtils";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Component to display model performance metrics using Chart.js Radar chart
export default function PerformanceChart({ stats }) {
  if (!stats) return null;

  // Utility: round to 2 decimals safely
  const round2 = (n) => Math.round((n || 0) * 10000) / 100;

  // Data for radar chart
  const exportData = [
    { metric: "Accuracy", value: round2(stats.accuracy) },
    { metric: "Precision", value: round2(stats.precision) },
    { metric: "Recall", value: round2(stats.recall) },
    { metric: "F1 Score", value: round2(stats.f1_score) },
  ];

  // Detect dark mode
  const isDark = document.documentElement.classList.contains("dark");

  // Chart.js data configuration
  const chartData = {
    labels: exportData.map((d) => d.metric),
    datasets: [
      {
        label: "Performance Metrics (%)",
        data: exportData.map((d) => d.value),
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(99, 102, 241, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: isDark ? "#f9fafb" : "#111827",
          font: {
            size: 12,
            weight: "500",
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#f9fafb",
        titleColor: isDark ? "#f9fafb" : "#111827",
        bodyColor: "#6366f1",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            return `Performance: ${context.parsed.r.toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#9ca3af",
          backdropColor: "transparent",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "#d1d5db",
        },
        angleLines: {
          color: "#d1d5db",
        },
        pointLabels: {
          color: "#9ca3af",
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
    },
  };

  // Handle chart data export
  const handleExport = () => {
    exportChartToCSV(
      exportData,
      `performance_metrics_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all flex flex-col items-center justify-center">
      {/* Header with export button */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 w-full mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Model Performance Overview
        </h3>
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors w-full xs:w-auto"
          title="Export performance metrics as CSV"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Chart.js Radar Chart */}
      <div className="flex items-center justify-center w-full h-[420px]">
        <div style={{ width: "90%", height: "100%" }}>
          <Radar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
