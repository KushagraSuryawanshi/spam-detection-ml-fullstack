import { useState, useEffect } from "react";
import {
  predictMessage,
  getStatistics,
  clearHistory,
  reloadModel,
} from "./services/api";

import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";
import StatsCards from "./components/StatsCards";
import TimelineChart from "./components/Charts/TimelineChart";
import DistributionChart from "./components/Charts/DistributionChart";
import PerformanceChart from "./components/Charts/PerformanceChart";
import ConfidenceChart from "./components/Charts/ConfidenceChart";
import HistoryPanel from "./components/HistoryPanel";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Main application component for spam detection dashboard
export default function App() {
  // Define application states
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [reloadingModel, setReloadingModel] = useState(false);

  // Fetch initial statistics on load
  useEffect(() => {
    getStatistics()
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  // Handle theme change
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  // Handle prediction request
  const handlePredict = async () => {
    if (!message.trim()) return setError("Please enter a message first.");
    setLoading(true);
    setError("");
    try {
      const { data } = await predictMessage(message);
      setPrediction(data);
      setHistory((prev) => [data, ...prev].slice(0, 20));
      const res = await getStatistics();
      setStats(res.data);
    } catch {
      setError("Backend not reachable. Make sure FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  // Handle clearing prediction history
  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
    setStats(await getStatistics().then((r) => r.data));
  };

  // Handle reloading of model and tokenizer
  const handleReloadModel = async () => {
    try {
      setReloadingModel(true);
      const res = await reloadModel();
      alert(res.data.message || "Model reloaded successfully!");
    } catch {
      alert("Model reload failed!");
    } finally {
      setReloadingModel(false);
    }
  };

  // Render main app structure
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navigation bar */}
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        reloadingModel={reloadingModel}
        handleReloadModel={handleReloadModel}
      />

      {/* Main dashboard content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        <PredictionForm
          message={message}
          setMessage={setMessage}
          onSubmit={handlePredict}
          loading={loading}
          error={error}
        />

        {prediction && <PredictionResult result={prediction} />}

        {stats && (
          <>
            <StatsCards stats={stats} history={history} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <TimelineChart history={history} />
              <DistributionChart history={history} />
              <PerformanceChart stats={stats} />
              <ConfidenceChart history={history} />
            </div>
          </>
        )}

        <HistoryPanel history={history} onClear={handleClearHistory} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
