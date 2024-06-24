"use client";

import RecipeCard from "./Components/RecipeCard";
import TitleHeader from "../../../Components/TitleHeader";
import { useState } from "react";

export default function DiscoverPage({ searchParams }: { searchParams: any }) {
  const [bookmarkedRecipe, setBookmarkedRecipe] = useState<string[]>([]);
  return (
    <>
      <TitleHeader />
      <RecipeCard
        bookmarkedRecipe={bookmarkedRecipe}
        setBookmarkedRecipe={setBookmarkedRecipe}
        recipeQuery={searchParams.recipeQuery}
      />
    </>
  );
}
