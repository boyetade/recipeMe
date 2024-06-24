import React from "react";
import RecipeCard from "./RecipeCard";

const FeatureRecipes = () => {
  return (
    <>
      <p className="text-xl font-semibold mb-10 flex items-center justify-center">
        Featured Lentil Recipes
      </p>
      <RecipeCard />
    </>
  );
};

export default FeatureRecipes;
