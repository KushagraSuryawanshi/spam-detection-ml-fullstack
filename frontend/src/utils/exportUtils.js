/**
   Provides functions for exporting application data in various formats.
 */

// Export prediction history to CSV file

export const exportHistoryToCSV = (
  history,
  filename = "spam_predictions.csv"
) => {
  // Validate input
  if (!history || !Array.isArray(history) || history.length === 0) {
    alert("No prediction data available to export");
    return;
  }

  try {
    // Define CSV headers
    const headers = [
      "Timestamp",
      "Message Preview",
      "Prediction",
      "Confidence (%)",
      "Processing Time (s)",
    ];

    // Convert history objects to CSV rows
    const rows = history.map((item) => {
      // Format timestamp
      const timestamp = item.timestamp
        ? new Date(item.timestamp).toLocaleString()
        : "N/A";

      // Escape message preview for CSV (replace quotes with double-quotes)
      const messagePreview = (item.message_preview || "").replace(/"/g, '""');

      // Format confidence as percentage
      const confidence =
        typeof item.confidence === "number"
          ? item.confidence.toFixed(2)
          : "N/A";

      // Format processing time
      const processingTime = item.processing_time || "N/A";

      // Capitalize prediction
      const prediction = (item.prediction || "unknown").toUpperCase();

      return [
        `"${timestamp}"`,
        `"${messagePreview}"`,
        prediction,
        confidence,
        processingTime,
      ];
    });

    // Combine headers and rows into CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and trigger download
    downloadFile(csvContent, filename, "text/csv;charset=utf-8;");
  } catch (error) {
    console.error("CSV export failed:", error);
    alert("Failed to export CSV. Please try again.");
  }
};

/**
 Export statistics data to JSON file
 */
export const exportStatsToJSON = (
  stats,
  filename = "model_statistics.json"
) => {
  // Validate input
  if (!stats || typeof stats !== "object") {
    alert("No statistics data available to export");
    return;
  }

  try {
    // Format JSON with 2-space indentation for readability
    const jsonContent = JSON.stringify(stats, null, 2);

    // Create blob and trigger download
    downloadFile(jsonContent, filename, "application/json");
  } catch (error) {
    console.error("JSON export failed:", error);
    alert("Failed to export statistics. Please try again.");
  }
};

/**
   Export chart data to CSV format
 */
export const exportChartToCSV = (data, filename, headers = null) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    alert("No chart data available to export");
    return;
  }

  try {
    // Auto-detect headers from first object keys if not provided
    const csvHeaders = headers || Object.keys(data[0]);

    // Convert data to CSV rows
    const rows = data.map((item) =>
      csvHeaders.map((header) => {
        const value = item[header];
        // Escape string values that contain commas or quotes
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
    );

    // Build CSV content
    const csvContent = [
      csvHeaders.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Trigger download
    downloadFile(csvContent, filename, "text/csv;charset=utf-8;");
  } catch (error) {
    console.error("Chart export failed:", error);
    alert("Failed to export chart data. Please try again.");
  }
};

/**
  Helper function to trigger file download in browser
  Creates a temporary blob URL and triggers download via hidden link element.
  Automatically cleans up after download.

 */
function downloadFile(content, filename, mimeType) {
  // Create blob from content
  const blob = new Blob([content], { type: mimeType });

  // Create temporary download link
  const link = document.createElement("a");

  // Check if download attribute is supported
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up object URL
    URL.revokeObjectURL(url);
  } else {
    alert("File download not supported in this browser");
  }
}
