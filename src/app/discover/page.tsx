"use client";

import RecipeCard from "./Components/RecipeCard";
import TitleHeader from "../../../Components/TitleHeader";

export default function DiscoverPage({ searchParams }: { searchParams: any }) {
  return (
    <>
      <TitleHeader />
      <RecipeCard recipeQuery={searchParams.recipeQuery} />
    </>
  );
}
