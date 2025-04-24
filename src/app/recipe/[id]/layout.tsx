import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recipe | Flavourythm',
  description: 'View detailed recipe information including ingredients and instructions.',
};

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 