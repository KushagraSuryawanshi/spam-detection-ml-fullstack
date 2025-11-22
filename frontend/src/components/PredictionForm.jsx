import { useState, useEffect } from "react";

export default function PredictionForm({
  message,
  setMessage,
  onSubmit,
  loading,
  error,
}) {
  const [charCount, setCharCount] = useState(0);
  const [validationError, setValidationError] = useState("");

  // Update character count when message changes
  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  // Validate input before submission
  const handleSubmit = () => {
    const trimmed = message.trim();

    if (trimmed.length === 0) {
      setValidationError("Please enter a message to analyze");
      return;
    }

    if (trimmed.length < 10) {
      setValidationError("Message must be at least 10 characters long");
      return;
    }

    if (trimmed.length > 5000) {
      setValidationError("Message must not exceed 5000 characters");
      return;
    }

    setValidationError("");
    onSubmit();
  };

  // Determine validation state for visual feedback
  const getValidationState = () => {
    if (charCount === 0) return "neutral";
    if (charCount < 10) return "error";
    if (charCount > 5000) return "error";
    return "success";
  };

  const validationState = getValidationState();

  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-4 sm:p-8 transition-all">
      <h2 className="text-xl font-semibold mb-4">Analyze Message</h2>

      {/* Textarea with validation feedback */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to analyze for spam (minimum 10 characters)..."
        className={`w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors ${
          validationState === "error"
            ? "border-red-500 dark:border-red-400"
            : validationState === "success"
            ? "border-green-500 dark:border-green-400"
            : "border-gray-300 dark:border-gray-700"
        }`}
        disabled={loading}
      />

      {/* Character count display */}
      <div className="flex justify-between items-center mt-2">
        <span
          className={`text-sm ${
            validationState === "error"
              ? "text-red-500 dark:text-red-400"
              : validationState === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {charCount} / 5000 characters
          {charCount < 10 &&
            charCount > 0 &&
            ` (${10 - charCount} more needed)`}
        </span>
      </div>

      {/* Display validation or API errors */}
      {(validationError || error) && (
        <p className="text-red-500 dark:text-red-400 mt-2 text-sm font-medium">
          {validationError || error}
        </p>
      )}

      {/* Submit button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || charCount < 10 || charCount > 5000}
          className="relative inline-block p-px font-semibold text-sm text-white rounded-xl bg-black hover:scale-105 active:scale-95 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="relative block px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800">
            {loading ? "Analyzing..." : "Analyze Message"}
          </span>
        </button>
      </div>
    </section>
  );
}
