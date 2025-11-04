export default function HistoryPanel({ history, onClear }) {
  if (!history.length) return null;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Predictions</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((item, i) => (
          <div
            key={i}
            className={`p-3 border-l-4 rounded-md transition-colors duration-300 ${
              item.prediction === "spam"
                ? "border-red-500 bg-red-50"
                : "border-green-500 bg-green-50"
            }`}
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
