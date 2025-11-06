// Component to display recent prediction history
export default function HistoryPanel({ history, onClear }) {
  // Return nothing if no prediction history exists
  if (!history.length) return null;

  // Render history panel with recent predictions
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-8 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Predictions</h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all"
        >
          Clear History
        </button>
      </div>

      {/* Scrollable list of prediction history */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {history.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all"
          >
            <p className="font-medium">{item.message_preview || item.message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(item.timestamp).toLocaleString()} — {item.confidence.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
