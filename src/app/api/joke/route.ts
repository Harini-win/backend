import { NextResponse } from 'next/server';

const API_KEY = '9030cdcbe64241eea03d82bb20c19fc7';

export async function GET() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching joke:', error);
    return NextResponse.json(
      { error: 'Failed to fetch joke' },
      { status: 500 }
    );
  }
} 