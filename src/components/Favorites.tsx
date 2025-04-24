'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch favorites from your backend
      // For now, we'll use localStorage as a simple solution
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to view your favorites</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-gray-600">Loading your favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">You haven't saved any favorites yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favorites.map((recipe) => (
        <div 
          key={recipe.id} 
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover transition-all duration-300 hover:brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
            <div className="flex gap-4 mb-4">
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                ⏱️ {recipe.readyInMinutes} min
              </div>
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                👥 {recipe.servings} servings
              </div>
            </div>
            <button
              onClick={() => {
                const newFavorites = favorites.filter(f => f.id !== recipe.id);
                setFavorites(newFavorites);
                localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
              }}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              Remove from Favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 