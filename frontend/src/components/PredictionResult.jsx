// Component to display prediction result with confidence visualization
export default function PredictionResult({ result }) {
  // Determine if message is classified as spam
  const isSpam = result.prediction === "spam";

  // Render result card with styled progress bar
  return (
    <section
      className={`p-6 rounded-3xl border transition-all duration-300 ${
        isSpam ? "border-red-500" : "border-green-500"
      } bg-white dark:bg-gray-900 shadow-sm`}
    >
      {/* Prediction label */}
      <h3
        className={`text-xl font-semibold ${
          isSpam ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
        }`}
      >
        {isSpam ? "SPAM DETECTED" : "LEGITIMATE MESSAGE"}
      </h3>

      {/* Confidence value */}
      <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
        Confidence: {result.confidence.toFixed(2)}%
      </p>

      {/* Confidence progress bar */}
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
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
