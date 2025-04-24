'use client';

import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  cuisines: string[];
  dishTypes: string[];
}

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [type, setType] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '9030cdcbe64241eea03d82bb20c19fc7';

  const searchRecipes = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&cuisine=${cuisine}&diet=${diet}&type=${type}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Enter ingredients..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
          />
          
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 cursor-pointer hover:bg-gray-50"
          >
            <option value="">All Cuisines</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="thai">Thai</option>
          </select>
          
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 cursor-pointer hover:bg-gray-50"
          >
            <option value="">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
          </select>
          
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 cursor-pointer hover:bg-gray-50"
          >
            <option value="">All Types</option>
            <option value="main course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="salad">Salad</option>
            <option value="soup">Soup</option>
            <option value="breakfast">Breakfast</option>
          </select>
        </div>
        
        <button
          onClick={searchRecipes}
          className="w-full md:w-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Search Recipes
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">Loading recipes...</div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
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
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.vegetarian && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm transition-all duration-300 hover:bg-green-200">
                    Vegetarian
                  </span>
                )}
                {recipe.vegan && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm transition-all duration-300 hover:bg-green-200">
                    Vegan
                  </span>
                )}
                {recipe.glutenFree && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm transition-all duration-300 hover:bg-yellow-200">
                    Gluten Free
                  </span>
                )}
              </div>
              <a
                href={`/recipe/${recipe.id}`}
                className="block text-center py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                View Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 