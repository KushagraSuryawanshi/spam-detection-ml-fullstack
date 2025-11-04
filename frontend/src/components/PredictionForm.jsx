export default function PredictionForm({
  message,
  setMessage,
  onSubmit,
  loading,
  error,
}) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4">Analyze Message</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to analyze for spam..."
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        disabled={loading}
      />
      {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}

      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600
                    text-white px-6 py-3 rounded-lg disabled:opacity-50 transition-colors "
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </section>
  );
}
