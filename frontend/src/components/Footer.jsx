// Footer component definition
export default function Footer() {
  return (
    // Footer container with margin, border, and background styles
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6">
      {/* Wrapper for footer content with responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Centered text block with vertical spacing */}
        <div className="text-center space-y-2">
          {/* Project title */}
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Spam Detection System - Assignment 3
          </p>
          {/* Group and member details */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Session-05 Group 2 • Kushagra Suryawanshi, Pradyuman Prajapati,
            Aryan Thakur
          </p>
          {/* Course and university info */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            COS30049 Computing Technology Innovation Project • Swinburne
            University of Technology • 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
