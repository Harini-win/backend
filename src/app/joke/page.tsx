'use client';

import { useEffect, useState } from 'react';
import { FoodEmoji } from '@/components/FoodEmoji';

export default function JokePage() {
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
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#e6ecd2]">
      <div className="card bg-white rounded-3xl w-full max-w-[600px] shadow-lg overflow-hidden">
        <div className="header bg-[#f76b1c] text-white p-5 flex items-center justify-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
          <h1 className="text-2xl font-semibold m-0">Food Joke of the Day</h1>
        </div>
        <div className="content p-8">
          <div className="joke-container text-center text-lg leading-relaxed text-gray-800 min-h-[100px] flex items-center justify-center">
            {loading ? (
              <div className="loading text-gray-600 italic flex items-center">
                <div className="loading-spinner inline-block w-6 h-6 border-3 border-gray-200 border-t-[#f76b1c] rounded-full animate-spin mr-2.5" />
                Loading today's joke...
              </div>
            ) : error ? (
              <div className="error text-[#f76b1c] italic">{error}</div>
            ) : (
              joke
            )}
          </div>
          <p className="text-center text-gray-600 text-sm mt-5">{nextUpdate}</p>
        </div>
      </div>
      <FoodEmoji />
    </main>
  );
} 