import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Download } from "lucide-react";
import { exportChartToCSV } from "../../utils/exportUtils";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Component to display spam vs ham distribution using Chart.js
export default function DistributionChart({ history }) {
  // Prepare data for pie chart based on prediction results
  const spamCount = history.filter((h) => h.prediction === "spam").length;
  const hamCount = history.filter((h) => h.prediction === "ham").length;

  const exportData = [
    { name: "Spam", value: spamCount, color: "#ef4444" },
    { name: "Ham", value: hamCount, color: "#22c55e" },
  ];

  // Detect dark mode
  const isDark = document.documentElement.classList.contains("dark");

  // Chart.js data configuration
  const chartData = {
    labels: ["Spam", "Ham"],
    datasets: [
      {
        data: [spamCount, hamCount],
        backgroundColor: ["#ef4444", "#22c55e"],
        borderColor: ["#dc2626", "#16a34a"],
        borderWidth: 2,
      },
    ],
  };

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDark ? "#f9fafb" : "#111827",
          font: {
            size: 13,
            weight: "500",
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#f9fafb",
        titleColor: isDark ? "#f9fafb" : "#111827",
        bodyColor: isDark ? "#f9fafb" : "#111827",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Handle chart export
  const handleExport = () => {
    exportChartToCSV(
      exportData,
      `distribution_data_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  // Render pie chart visualization using Chart.js
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all">
      {/* Header with title and export button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Spam vs Ham Distribution
        </h3>

        <button
          onClick={handleExport}
          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs transition-colors"
          title="Export distribution data as CSV"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Chart.js Pie Chart */}
      <div style={{ width: "100%", height: "300px" }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
