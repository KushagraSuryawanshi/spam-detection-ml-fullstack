import { TrendingUp, Shield, AlertCircle, Send } from "lucide-react";

// Component to display summary statistics and key performance indicators
export default function StatsCards({ stats, history }) {
  // Count number of spam and ham predictions
  const spamCount = history.filter((h) => h.prediction === "spam").length;
  const hamCount = history.filter((h) => h.prediction === "ham").length;

  // Define card data for statistics display
  const cards = [
    { label: "Accuracy", value: (stats.accuracy * 100).toFixed(2) + "%", icon: TrendingUp },
    { label: "Total Predictions", value: history.length, icon: Shield },
    { label: "Spam Detected", value: spamCount, icon: AlertCircle },
    { label: "Ham Messages", value: hamCount, icon: Send },
  ];

  // Render responsive statistics cards
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all"
        >
          {/* Card content displaying label and value */}
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{card.label}</p>
            <p className="text-3xl font-semibold mt-1">{card.value}</p>
          </div>

          {/* Icon for each statistic */}
          <card.icon className="w-8 h-8 text-black dark:text-white" />
        </div>
      ))}
    </section>
  );
}
