//frontend/src/pages/WelcomePage.jsx

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Welcome to AI Task App</h2>
      <p className="text-gray-600 max-w-xl text-base sm:text-lg">
        Your intelligent assistant for documenting, organizing and solving technical problems.
        Create tasks using AI, find similar past cases and close tasks with smart summaries.
      </p>
    </div>
  );
}
