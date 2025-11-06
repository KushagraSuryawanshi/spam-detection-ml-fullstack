// Component for user input to analyze message for spam detection
export default function PredictionForm({
  message,
  setMessage,
  onSubmit,
  loading,
  error,
}) {
  // Render prediction input form
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-8 transition-all">
      <h2 className="text-xl font-semibold mb-4">Analyze Message</h2>

      {/* Textarea for entering message to analyze */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to analyze for spam..."
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        disabled={loading}
      />

      {/* Display error if any */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Submit button for prediction request */}
      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="relative inline-block p-px font-semibold text-sm text-white rounded-xl bg-black hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <span className="relative block px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800">
            {loading ? "Analyzing..." : "Analyze Message"}
          </span>
        </button>
      </div>
    </section>
  );
}
