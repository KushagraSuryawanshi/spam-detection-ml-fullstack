import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Download } from "lucide-react";
import { exportChartToCSV } from "../../utils/exportUtils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Component to visualize confidence score distribution using Chart.js
export default function ConfidenceChart({ history }) {
  // Define confidence ranges
  const ranges = [
    { range: "0-20%", count: 0 },
    { range: "20-40%", count: 0 },
    { range: "40-60%", count: 0 },
    { range: "60-80%", count: 0 },
    { range: "80-100%", count: 0 },
  ];

  // Categorize prediction confidences into ranges
  history.forEach((h) => {
    const idx = Math.min(Math.floor(h.confidence / 20), 4);
    ranges[idx].count += 1;
  });

  // Detect dark mode
  const isDark = document.documentElement.classList.contains("dark");

  // Chart.js data configuration
  const chartData = {
    labels: ranges.map((r) => r.range),
    datasets: [
      {
        label: "Number of Predictions",
        data: ranges.map((r) => r.count),
        backgroundColor: "#8b5cf6",
        borderColor: "#7c3aed",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#f9fafb",
        titleColor: isDark ? "#f9fafb" : "#111827",
        bodyColor: isDark ? "#a5b4fc" : "#4f46e5",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Count: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Confidence Range",
          color: "#4b5563",
          font: {
            size: 14,
            weight: "600",
          },
          padding: { top: 10 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
          },
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Number of Predictions",
          color: "#4b5563",
          font: {
            size: 13,
            weight: "600",
          },
        },
      },
    },
  };

  // Handle chart export
  const handleExport = () => {
    exportChartToCSV(
      ranges,
      `confidence_distribution_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  // Render bar chart visualization using Chart.js
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all flex flex-col items-center justify-center">
      {/* Header with export button */}
      <div className="flex justify-between items-center self-stretch mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Confidence Distribution
        </h3>

        <button
          onClick={handleExport}
          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs transition-colors"
          title="Export confidence distribution as CSV"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Chart.js Bar Chart */}
      <div className="flex items-center justify-center w-full h-[420px]">
        <div style={{ width: "90%", height: "100%" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
