"use client";

import { FavoriteBorderOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Chip, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipeCard = ({
  recipeQuery,
  bookmarkedRecipe,
  setBookmarkedRecipe,
}: {
  recipeQuery: string;
  bookmarkedRecipe: string[];
  setBookmarkedRecipe: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const BASE_URL =
    " https://api.edamam.com/api/recipes/v2?type=public&app_id=1943fc10&app_key=b063254aac0d036d283313ac3023c22f&q=";

  const [recipes, setRecipes] = useState<any[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);
  const [isBookmarked, setIsBookMarked] = useState<boolean>(false);

  const handleBookmark = (recipeId: string) => {
    setBookmarkedRecipe((prevBookmarkedRecipes) => {
      const isAlreadyBookmarked = prevBookmarkedRecipes.includes(recipeId);

      if (isAlreadyBookmarked) {
        return prevBookmarkedRecipes.filter((id) => id !== recipeId);
      } else {
        return [...prevBookmarkedRecipes, recipeId];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(BASE_URL + recipeQuery);
        const data = await resp.json();
        setRecipes(data.hits);
      } catch (error) {
        console.error("Error fetching recipes;", error);
      }
    };
    fetchData();
  }, [recipeQuery]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="">
      <Grid
        container
        spacing={3}
        sx={{ paddingRight: "24px", paddingLeft: "24px" }}
      >
        {recipes.map((recipe, index) => {
          const isBookmarked = bookmarkedRecipe.includes(recipe.recipe.uri);
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={recipe.recipe.uri}
              sx={{}}
            >
              <Image
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                width={350}
                height={550}
                className="min-w-full h-[350px] rounded-xl"
              />
              <div className="mx-5">
                <div className="my-5 flex justify-between">
                  {recipe.recipe.dishType ? (
                    <Chip
                      label={recipe?.recipe?.dishType
                        ?.map(
                          (type: string) =>
                            type.charAt(0).toUpperCase() + type.slice(1)
                        )
                        .join(", ")}
                      variant="filled"
                    />
                  ) : (
                    <Chip
                      variant="outlined"
                      sx={{ borderColor: "transparent" }}
                    />
                  )}
                  {isBookmarked ? (
                    <FavoriteIcon
                      onClick={() => handleBookmark(recipe.recipe.uri)}
                      sx={{
                        color: red[600],
                        justifyContent: "end",
                      }}
                    />
                  ) : (
                    <FavoriteBorderOutlined
                      onClick={() => handleBookmark(recipe.recipe.uri)}
                      sx={{
                        color: red[600],
                        justifyContent: "end",
                      }}
                    />
                  )}
                </div>
                <p className="my-3 font-semibold ">
                  {recipe.recipe.label.replace("Recipe", " ")}
                </p>
                <p className="mb-4">
                  {" "}
                  {Math.round(
                    recipe.recipe.calories / recipe.recipe.yield
                  )}{" "}
                  kcal | {Math.round(recipe.recipe.ingredients[0].quantity)}{" "}
                  ingredient
                  {recipe.recipe.ingredients[0].quantity > 1 ? "s" : ""}
                </p>
                <div className="flex justify-center items-center my-5 text-red-600"></div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default RecipeCard;
