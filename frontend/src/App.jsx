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

import { Moon, Sun, RotateCcw } from "lucide-react";

export default function App() {
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [reloadingModel, setReloadingModel] = useState(false);

  useEffect(() => {
    getStatistics().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  // Dark mode effect
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

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

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
    setStats(await getStatistics().then((r) => r.data));
  };

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Spam Detection</h1>
          <div className="flex items-center gap-3">
            {/* Reload Model Button */}
            <button
              onClick={handleReloadModel}
              disabled={reloadingModel}
              title="Reload CNN Model"
              className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className={`w-6 h-6 ${reloadingModel ? "animate-spin" : ""}`} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
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
            <div className="grid md:grid-cols-2 gap-8">
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
      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © 2025 Spam Detection AI — Powered by CNN Deep Learning Model
      </footer>
    </div>
  );
}
