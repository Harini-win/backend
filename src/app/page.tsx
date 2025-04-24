'use client';

import { FoodEmoji } from '@/components/FoodEmoji';
import Recipe from '@/components/Recipe';
import Search from '@/components/Search';
import Favorites from '@/components/Favorites';
import Link from 'next/link';
import { useState } from 'react';
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [showRecipe, setShowRecipe] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <main className="w-full min-h-screen max-w-[1920px] mx-auto relative">
      {/* Title */}
      <div className="absolute top-6 left-0 right-0 z-10 text-center">
        <h1 className="text-8xl font-['MyFont'] text-white mb-8">
          Flavourythm
        </h1>
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
        {/* Search Button */}
        <button
          onClick={() => setShowSearch(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/30"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <span>Search Recipes</span>
        </button>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <button
              onClick={() => setShowFavorites(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/30"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              <span>Favorites</span>
            </button>
          </SignedIn>
          <div className="bg-white/10 p-1 rounded-full">
            <SignedOut>
              <SignIn />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Clickable Areas */}
      <div className="absolute inset-0">
        {/* Recipe Card Link */}
        <div 
          onClick={() => setShowRecipe(true)}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-white"
          style={{
            bottom: '15%',
            left: 'calc(50% - 280px)',
            width: '250px',
            height: '300px',
          }}
          aria-label="Recipe of the day"
        />

        {/* Joke Card Link */}
        <Link 
          href="/joke" 
          className="absolute cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-white"
          style={{
            bottom: '15%',
            left: 'calc(50% + 30px)',
            width: '250px',
            height: '300px',
          }}
          aria-label="Joke of the day"
        />
      </div>

      {/* Recipe Modal */}
      {showRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl">
            <Recipe onClose={() => setShowRecipe(false)} />
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-7xl">
            <button 
              onClick={() => setShowSearch(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              ✕
            </button>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Search Recipes</h2>
                <Search />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-7xl">
            <button 
              onClick={() => setShowFavorites(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              ✕
            </button>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Your Favorites</h2>
                <Favorites />
              </div>
            </div>
          </div>
        </div>
      )}

      <FoodEmoji />
    </main>
  );
} 