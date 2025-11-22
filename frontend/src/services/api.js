import axios from "axios";

// Backend API base URL
const API_BASE = "http://localhost:8000";

// Configure axios instance with timeout and error interceptor
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Global error handler for API responses
 * Provides specific error messages based on status codes
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          error.message =
            data.detail || "Invalid input. Please check your message.";
          break;
        case 422:
          error.message =
            data.detail?.[0]?.msg || "Validation error. Check message format.";
          break;
        case 503:
          error.message = "AI model is loading. Please wait and try again.";
          break;
        case 500:
          error.message = "Server error. Please try again later.";
          break;
        default:
          error.message = `Error ${status}: ${
            data.detail || "Unknown error occurred"
          }`;
      }
    } else if (error.request) {
      // Request made but no response received
      error.message =
        "Cannot reach server. Ensure FastAPI is running on port 8000.";
    } else {
      // Error in request setup
      error.message = "Request failed. Please try again.";
    }

    return Promise.reject(error);
  }
);

//  Predict spam classification for a single message

export const predictMessage = (message) =>
  apiClient.post("/predict", { message });

// Retrieve model statistics and prediction history

export const getStatistics = () => apiClient.get("/statistics");

// Clear all prediction history from server

export const clearHistory = () => apiClient.delete("/history");

// Reload AI model and tokenizer on server

export const reloadModel = () => apiClient.put("/model/reload");
