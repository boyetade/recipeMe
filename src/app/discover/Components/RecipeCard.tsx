"use client";

import { BorderColor, FavoriteBorderOutlined } from "@mui/icons-material";
import { Button, Chip, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipeCard = ({ recipeQuery }: { recipeQuery: string }) => {
  const BASE_URL = " https://api.edamam.com/api";

  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          BASE_URL +
            "/recipes/v2?type=public&app_id=1943fc10&app_key=b063254aac0d036d283313ac3023c22f&q=" +
            recipeQuery
        );
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
        {recipes.map((recipe, index) => (
          // <div
          //   className="pt-5 pr-0 pl-0 pb-6.25 max-w-[366px] "
          //   key={}
          // >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            key={recipe.recipe.label}
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

                <FavoriteBorderOutlined
                  sx={{
                    color: red[600],
                    justifyContent: "end",
                  }}
                />
              </div>
              <p className="my-3 font-semibold ">
                {recipe.recipe.label.replace("Recipe", " ")}
              </p>
              <p className="mb-4">
                {" "}
                {Math.round(recipe.recipe.calories / recipe.recipe.yield)} kcal
                | {Math.round(recipe.recipe.ingredients[0].quantity)} ingredient
                {recipe.recipe.ingredients[0].quantity > 1 ? "s" : ""}
              </p>
              <div className="flex justify-center items-center my-5 text-red-600"></div>
            </div>
          </Grid>

          // </div>
        ))}
      </Grid>
    </div>
  );
};

export default RecipeCard;
