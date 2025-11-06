import { Moon, Sun, RotateCcw } from "lucide-react";

// Navigation bar component with dark mode toggle and model reload
export default function NavBar({
  darkMode,
  setDarkMode,
  reloadingModel,
  handleReloadModel,
}) {
  // Render top navigation bar
  return (
    <header
      className={`${
        darkMode
          ? "bg-gray-900 border-b border-gray-800"
          : "bg-gray-100 border-b border-gray-200"
      } py-4`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        {/* Application title */}
        <h1 className="text-2xl font-bold tracking-tight">Spam Detection</h1>

        {/* Action buttons: reload model and toggle theme */}
        <div className="flex items-center gap-3">
          {/* Reload CNN model button */}
          <button
            onClick={handleReloadModel}
            disabled={reloadingModel}
            title="Reload CNN Model"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <RotateCcw
              className={`w-6 h-6 ${reloadingModel ? "animate-spin" : ""}`}
            />
          </button>

          {/* Toggle dark/light mode button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
