import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ZoomIn, ZoomOut, Filter, Download } from "lucide-react";
import { exportChartToCSV } from "../../utils/exportUtils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Displays prediction confidence trends over time with interactive features using Chart.js
export default function TimelineChart({ history }) {
  const [filter, setFilter] = useState("all"); // all, spam, ham
  const [dataRange, setDataRange] = useState(20); // Number of predictions to show

  // Filter data based on selected filter type
  const getFilteredData = () => {
    let filtered = history;
    if (filter === "spam") {
      filtered = history.filter((h) => h.prediction === "spam");
    } else if (filter === "ham") {
      filtered = history.filter((h) => h.prediction === "ham");
    }

    return filtered
      .slice(0, dataRange)
      .reverse()
      .map((h, i) => ({
        id: i + 1,
        confidence: parseFloat(h.confidence.toFixed(2)),
        prediction: h.prediction,
        timestamp: new Date(h.timestamp).toLocaleTimeString(),
        fullTimestamp: h.timestamp,
      }));
  };

  const data = getFilteredData();

  // Handle zoom in (show fewer predictions for detail)
  const handleZoomIn = () => {
    if (dataRange > 5) setDataRange((prev) => Math.max(5, prev - 5));
  };

  // Handle zoom out (show more predictions for overview)
  const handleZoomOut = () => {
    if (dataRange < history.length) {
      setDataRange((prev) => Math.min(history.length, prev + 5));
    }
  };

  // Handle chart export
  const handleExport = () => {
    exportChartToCSV(
      data,
      `timeline_data_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  // Detect dark mode
  const isDark = document.documentElement.classList.contains("dark");

  // Chart.js data configuration
  const chartData = {
    labels: data.map((d) => `#${d.id}`),
    datasets: [
      {
        label: "Confidence Score",
        data: data.map((d) => d.confidence),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#6366f1",
        pointHoverBorderColor: "#fff",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: isDark ? "#f9fafb" : "#111827",
          font: {
            size: 13,
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
        padding: 14,
        displayColors: false,
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            return `Prediction #${data[index].id}`;
          },
          label: function (context) {
            return `Confidence: ${context.parsed.y}%`;
          },
          afterLabel: function (context) {
            const index = context.dataIndex;
            const item = data[index];
            return [
              `Type: ${item.prediction.toUpperCase()}`,
              `Time: ${item.timestamp}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 11,
          },
        },
        title: {
          display: true,
          text: "Prediction",
          color: "#6b7280",
          font: {
            size: 12,
            weight: "500",
          },
          padding: { top: 10 },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 11,
          },
          stepSize: 20,
        },
        title: {
          display: true,
          text: "Confidence %",
          color: "#6b7280",
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
    },
  };

  // Render line chart with interactive controls using Chart.js
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 transition-all">
      {/* Header with title and controls */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Prediction Timeline
          </h3>

          {/* Export CSV button - desktop only inline, mobile below */}
          <button
            onClick={handleExport}
            className="hidden xs:flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs transition-colors"
            title="Export timeline data as CSV"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* Interactive controls */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Filter dropdown */}
          <div className="relative flex-1 min-w-[140px] max-w-[200px]">
            <Filter
              size={16}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Predictions</option>
              <option value="spam">Spam Only</option>
              <option value="ham">Ham Only</option>
            </select>
          </div>

          {/* Zoom controls */}
          <div className="flex gap-2">
            <button
              onClick={handleZoomIn}
              disabled={dataRange <= 5}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={dataRange >= history.length}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
          </div>

          {/* Export CSV button - mobile only */}
          <button
            onClick={handleExport}
            className="xs:hidden flex items-center justify-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs transition-colors flex-1 min-w-[120px]"
            title="Export timeline data as CSV"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Data info */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Showing {data.length} of {history.length} predictions
      </p>

      {/* Chart.js Line Chart */}
      <div style={{ width: "100%", height: "320px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
