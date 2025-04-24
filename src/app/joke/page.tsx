'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FoodEmoji } from '@/components/FoodEmoji';

export default function JokePage() {
  const router = useRouter();
  const [joke, setJoke] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState('');

  const getTimeUntilTomorrow = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilTomorrow = tomorrow.getTime() - now.getTime();
    
    const hours = Math.floor(msUntilTomorrow / (1000 * 60 * 60));
    const minutes = Math.floor((msUntilTomorrow % (1000 * 60 * 60)) / (1000 * 60));
    return `Next joke in: ${hours}h ${minutes}m`;
  };

  const fetchJoke = async () => {
    try {
      const response = await fetch('/api/joke');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error fetching joke:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadTodaysJoke = async () => {
      const savedDate = localStorage.getItem('jokeDate');
      const today = new Date().toDateString();
      const savedJoke = localStorage.getItem('dailyJoke');

      try {
        let jokeText;
        if (savedDate === today && savedJoke) {
          jokeText = savedJoke;
        } else {
          jokeText = await fetchJoke();
          localStorage.setItem('dailyJoke', jokeText);
          localStorage.setItem('jokeDate', today);
        }
        
        setJoke(jokeText);
        setNextUpdate(getTimeUntilTomorrow());
        
        const interval = setInterval(() => {
          setNextUpdate(getTimeUntilTomorrow());
          
          const currentDate = new Date().toDateString();
          if (currentDate !== today) {
            window.location.reload();
          }
        }, 60000);

        return () => clearInterval(interval);
      } catch (error) {
        setError('Sorry, couldn\'t load today\'s joke. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTodaysJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-6 py-2 bg-white text-orange-500 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 group"
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

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Joke of the Day</h1>
          
          {/* Add your joke content here */}
          <div className="text-center text-xl">
            Why don't eggs tell jokes?
            <p className="mt-4 text-orange-500 font-semibold">
              They'd crack up! 🥚
            </p>
          </div>
        </div>
      </div>
      <FoodEmoji />
    </div>
  );
} 