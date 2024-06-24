"use client";

import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipeCard = () => {
  const BASE_URL = " https://api.edamam.com/api";

  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          BASE_URL +
            "/recipes/v2?type=public&app_id=1943fc10&app_key=b063254aac0d036d283313ac3023c22f&q=lentil"
        );
        const data = await resp.json();
        setRecipes(data.hits);
      } catch (error) {
        console.error("Error fetching recipes;", error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {recipes.map((recipe, index) => (
          <div className="w-[366px] h-[560px] " key={recipe.recipe.label}>
            <Image
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              width={366}
              height={0}
              className="min-w-full h-auto rounded-t-xl"
            />
            <div className="mx-5">
              <div className="my-5 flex justify-between">
                {}
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
              <div className="flex justify-center items-center my-5 text-red-600">
                <Button variant="contained" className=" bg-red-600">
                  Check me out
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecipeCard;
