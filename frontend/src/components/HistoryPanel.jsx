import { Download } from "lucide-react";
import { exportHistoryToCSV } from "../utils/exportUtils";

export default function HistoryPanel({ history, onClear }) {
  // Return nothing if no prediction history exists
  if (!history.length) return null;

  // Handle CSV export
  const handleExport = () => {
    exportHistoryToCSV(
      history,
      `spam_predictions_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  // Render history panel with recent predictions
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-4 sm:p-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">
          Recent Predictions ({history.length})
        </h3>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          {/* Export button - full width on mobile */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors w-full xs:w-auto"
            title="Export history to CSV"
          >
            <Download size={16} />
            Export CSV
          </button>

          {/* Clear history button - full width on mobile */}
          <button
            onClick={onClear}
            className="text-sm px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 transition-all w-full xs:w-auto"
          >
            Clear History
          </button>
        </div>
      </div>

      {/* Scrollable list of prediction history */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {history.map((item, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all ${
              item.prediction === "spam"
                ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
                : "border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/30"
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="font-medium flex-1 mr-3">
                {item.message_preview || item.message}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.prediction === "spam"
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
                    : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                }`}
              >
                {item.prediction === "spam" ? "SPAM" : "HAM"}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {new Date(item.timestamp).toLocaleString()} • Confidence:{" "}
              {item.confidence.toFixed(1)}% • Processed in{" "}
              {item.processing_time}s
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
