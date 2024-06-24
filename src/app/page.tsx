import TitleHeader from "../../Components/TitleHeader";
import RecipeCarousel from "../../Components/RecipeCarousel";
import ByIngredients from "../../Components/ByIngredients";
import FeatureRecipes from "../../Components/FeatureRecipes";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <TitleHeader />
      <RecipeCarousel />
      <ByIngredients />
      <FeatureRecipes />
    </>
  );
}
