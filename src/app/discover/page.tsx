"use client";

import RecipeCard from "./Components/RecipeCard";
import TitleHeader from "../../../Components/TitleHeader";
import { useEffect, useState } from "react";

export default function DiscoverPage({
  searchParams,
}: {
  searchParams: string;
}) {
  return (
    <>
      <TitleHeader />
      <RecipeCard recipeQuery={searchParams.recipeQuery} />
    </>
  );
}
