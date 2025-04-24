import RecipeClient from './RecipeClient';

interface Props {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: Props) {
  return <RecipeClient params={params} />;
} 