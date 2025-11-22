import { TrendingUp, Shield, AlertCircle, Send, Download } from "lucide-react";
import { exportStatsToJSON } from "../utils/exportUtils";

// Component to display summary statistics and key performance indicators
export default function StatsCards({ stats, history }) {
  // Count number of spam and ham predictions
  const spamCount = history.filter((h) => h.prediction === "spam").length;
  const hamCount = history.filter((h) => h.prediction === "ham").length;

  // Define card data for statistics display
  const cards = [
    {
      label: "Accuracy",
      value: (stats.accuracy * 100).toFixed(2) + "%",
      icon: TrendingUp,
    },
    { label: "Total Predictions", value: history.length, icon: Shield },
    { label: "Spam Detected", value: spamCount, icon: AlertCircle },
    { label: "Ham Messages", value: hamCount, icon: Send },
  ];

  // Render responsive statistics cards
  // Render responsive statistics cards
  return (
    <section className="mb-6">
      {/* Header row with export button */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">Model Statistics</h3>
        <button
          onClick={() =>
            exportStatsToJSON(
              stats,
              `model_stats_${new Date().toISOString().split("T")[0]}.json`
            )
          }
          className="flex items-center justify-center gap-2 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full xs:w-auto"
          title="Export model statistics as JSON"
        >
          <Download size={16} />
          Export JSON
        </button>
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-5 sm:p-6 flex items-center justify-between hover:shadow-md transition-all"
          >
            {/* Card content displaying label and value */}
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {card.label}
              </p>
              <p className="text-2xl sm:text-3xl font-semibold mt-1">
                {card.value}
              </p>
            </div>

            {/* Icon for each statistic */}
            <card.icon className="w-7 h-7 sm:w-8 sm:h-8 text-black dark:text-white flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
