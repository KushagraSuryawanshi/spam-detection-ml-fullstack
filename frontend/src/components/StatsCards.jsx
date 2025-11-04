import { TrendingUp, Shield, AlertCircle, Send } from "lucide-react";

export default function StatsCards({ stats, history }) {
  const spamCount = history.filter((h) => h.prediction === "spam").length;
  const hamCount = history.filter((h) => h.prediction === "ham").length;

  const cards = [
    { label: "Accuracy", value: (stats.accuracy * 100).toFixed(2) + "%", icon: TrendingUp },
    { label: "Total Predictions", value: history.length, icon: Shield },
    { label: "Spam Detected", value: spamCount, icon: AlertCircle },
    { label: "Ham Messages", value: hamCount, icon: Send },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex items-center justify-between transition-colors duration-300">
          <div>
            <p className="text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-gray-100">{card.value}</p>
          </div>
          <card.icon className="w-8 h-8 text-indigo-600" />
        </div>
      ))}
    </section>
  );
}
