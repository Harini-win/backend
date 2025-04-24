'use client';

import { FoodEmoji } from '@/components/FoodEmoji';
import Recipe from '@/components/Recipe';
import Search from '@/components/Search';
import Link from 'next/link';
import { useEffect } from 'react';
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  useEffect(() => {
    // Initialize Clerk if needed
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@clerk/clerk-js@latest/dist/clerk.browser.js";
    document.body.appendChild(script);
  }, []);

  return (
    <main className="w-full min-h-screen max-w-[1920px] mx-auto relative">
      {/* Title */}
      <div className="absolute top-6 left-0 right-0 z-10 text-center">
        <h1 className="text-8xl font-['MyFont'] text-white mb-8">
          Flavourythm
        </h1>
      </div>

      {/* Authentication */}
      <div className="absolute top-4 right-4 z-30">
        <SignedOut>
          <SignIn />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Recipe and Search Components */}
      <div className="pt-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Recipe of the Day</h2>
            <Recipe />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Search Recipes</h2>
            <Search />
          </div>
        </div>
      </div>

      <FoodEmoji />
    </main>
  );
} 