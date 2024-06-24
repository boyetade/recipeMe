"use client";
import React, { useState } from "react";
import ingredientData from "../ingredientData.json";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";

const ByIngredients = () => {
  const ingreData = ingredientData.data.ingredientData;

  return (
    <>
      <div className="flex justify-center items-center mt-[55px]">
        <p className="text-[25px]">Recipes based on a ingredient</p>
      </div>
      <div className="grid grid-cols-4 mt-10 gap-4 justify-center items-center">
        {ingreData.map((i) => (
          <Link
            href={{
              pathname: "/discover",
              query: { recipeQuery: i.name },
            }}
            key={i.name}
          >
            <div className="grid justify-center items-center">
              <Image
                src={i.image}
                alt="Tester"
                width="183"
                height="183"
                className="w-[183px] h-[183px]  "
              />
              <p className="text-center mt-5 font-semibold">{i.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <SearchBar debouncedSearchQuery="" />
      </div>
    </>
  );
};

export default ByIngredients;
