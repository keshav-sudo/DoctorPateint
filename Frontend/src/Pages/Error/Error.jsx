import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="text-center max-w-lg p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Wrong Page!</h2>
        <p className="text-gray-300 mb-6">
          This page is not for you. Please go to the correct dashboard for your role (e.g., Doctor or Patient).
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default Error;
