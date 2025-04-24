'use client';

import { useState } from 'react';

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

export default function Recipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  const API_KEY = '9030cdcbe64241eea03d82bb20c19fc7';

  const fetchRecipe = async () => {
    if (isLoaded) return;
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1&addRecipeInformation=true`
      );
      if (!response.ok) throw new Error('Failed to fetch recipe');
      const data = await response.json();
      setRecipe(data.recipes[0]);
      setIsLoaded(true);
    } catch (err) {
      setError('Failed to load recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center p-8">
          <h3 className="text-2xl font-semibold mb-6">Recipe of the Day</h3>
          <button
            onClick={fetchRecipe}
            className="px-8 py-3 bg-orange-500 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-lg"
          >
            Click to Reveal Today's Recipe
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading your delicious recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center p-8">
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">{recipe.title}</h2>
      
      <div className="mb-8">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          ⏱️ Prep: {recipe.preparationMinutes || Math.floor(recipe.readyInMinutes/2) || '--'} min
        </div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          🍳 Cook: {recipe.cookingMinutes || (recipe.readyInMinutes - (recipe.preparationMinutes || Math.floor(recipe.readyInMinutes/2))) || '--'} min
        </div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          👥 Serves: {recipe.servings || '--'}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
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

      <div className="mt-6">
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
  );
} 