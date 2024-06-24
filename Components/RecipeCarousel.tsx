"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Chip } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipeCarousel = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  const BASE_URL = " https://api.edamam.com/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          BASE_URL +
            "/recipes/v2?type=public&app_id=1943fc10&app_key=b063254aac0d036d283313ac3023c22f&imageSize=LARGE"
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
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
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
        {recipes &&
          recipes.slice(0, 9).map((recipe, index) => (
            <div className="5" key={recipe.recipe.label}>
              <div>
                <Image
                  src={recipe.recipe.image}
                  alt={recipe.recipe.label}
                  width={624}
                  height={0}
                  className="w-[624px] h-auto"
                />
              </div>
              <div>
                <div className="mt-5 mb-2">
                  <Chip
                    label={recipe.recipe.dietLabels[0]}
                    variant="outlined"
                    className="text-amber-700"
                  />
                </div>
                <div>
                  <p className="font-medium">{recipe.recipe.label}</p>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default RecipeCarousel;
