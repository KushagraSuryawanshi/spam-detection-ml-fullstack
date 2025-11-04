export default function PredictionResult({ result }) {
  const isSpam = result.prediction === "spam";

  return (
    <section
      className={`p-6 rounded-xl shadow-lg border-2 transition-colors duration-300 ${
        isSpam
          ? "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700"
          : "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700"
      }`}
    >
      <h3
        className={`text-2xl font-bold ${
          isSpam ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"
        }`}
      >
        {isSpam ? "⚠️ SPAM DETECTED" : "✅ LEGITIMATE MESSAGE"}
      </h3>

      {/* Make confidence text darker and bolder */}
      <p className="text-gray-800 dark:text-gray-200 font-semibold mt-2">
        Confidence: {result.confidence.toFixed(2)}%
      </p>

      <div className="mt-4 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            isSpam ? "bg-red-600" : "bg-green-600"
          }`}
          style={{ width: `${result.confidence}%` }}
        ></div>
      </div>
    </section>
  );
}
