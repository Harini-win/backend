export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600 text-center">Loading your delicious recipe...</p>
        </div>
      </div>
    </div>
  );
} 