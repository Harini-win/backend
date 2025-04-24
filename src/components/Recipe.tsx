'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  preparationMinutes: number;
  cookingMinutes: number;
  servings: number;
  extendedIngredients: any[];
  analyzedInstructions: any[];
}

interface RecipeProps {
  onClose: () => void;
}

export default function Recipe({ onClose }: RecipeProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useUser();

  const API_KEY = '9030cdcbe64241eea03d82bb20c19fc7';

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1&addRecipeInformation=true`
      );
      if (!response.ok) throw new Error('Failed to fetch recipe');
      const data = await response.json();
      setRecipe(data.recipes[0]);
    } catch (err) {
      setError('Failed to load recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (!user || !recipe) return;
    
    const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    // Check if recipe is already in favorites
    if (!favorites.some((f: Recipe) => f.id === recipe.id)) {
      const newFavorites = [...favorites, recipe];
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <button
            onClick={onClose}
            className="mb-6 px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 group"
          >
            <svg 
              className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600 text-center">Loading your delicious recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <button
            onClick={onClose}
            className="mb-6 px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 group"
          >
            <svg 
              className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchRecipe}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-h-[90vh] flex flex-col">
      <div className="sticky top-0 bg-white z-10 p-6 pb-2 border-b">
        <button
          onClick={onClose}
          className="mb-4 px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 group"
        >
          <svg 
            className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-4">{recipe.title}</h2>
        
        <div className="flex justify-center gap-4 mb-4">
          <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
            ⏱️ {recipe.readyInMinutes || '--'} min
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
            👥 {recipe.servings || '--'} servings
          </div>
          {user && (
            <button
              onClick={addToFavorites}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
            >
              ❤️ Add to Favorites
            </button>
          )}
        </div>

        <div className="flex gap-4 mb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-full transition-all duration-300 hover:shadow-md ${
              activeTab === 'overview' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-6 py-2 rounded-full transition-all duration-300 hover:shadow-md ${
              activeTab === 'ingredients' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-6 py-2 rounded-full transition-all duration-300 hover:shadow-md ${
              activeTab === 'instructions' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Instructions
          </button>
        </div>
      </div>

      <div className="overflow-y-auto p-6 pt-4">
        <div className="mb-6">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </div>

        <div className="mt-4">
          {activeTab === 'overview' && (
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          )}
          
          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <div className="w-20 h-20 mx-auto mb-2">
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                      alt={ingredient.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg'
                      }}
                    />
                  </div>
                  <p className="text-center text-sm">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'instructions' && (
            <ol className="list-decimal pl-6 space-y-4">
              {recipe.analyzedInstructions[0]?.steps.map((step: any, index: number) => (
                <li 
                  key={index}
                  className="transition-all duration-300 hover:bg-gray-50 p-2 rounded-lg"
                >
                  {step.step}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
} 