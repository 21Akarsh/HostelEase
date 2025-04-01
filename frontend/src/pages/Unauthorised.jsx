import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm w-full">
        <AlertTriangle size={48} className="text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900">Access Denied</h1>
        <p className="text-gray-700 mt-2">You are not authorized to access this page.</p>
        <button 
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/dashboard")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
