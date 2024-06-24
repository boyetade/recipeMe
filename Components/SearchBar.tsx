"use client";
import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchBar = ({
  debouncedSearchQuery,
}: {
  debouncedSearchQuery: string;
}) => {
  const [recipeQuery, setRecipeQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(recipeQuery, 300);
  const router = useRouter();
  const [recipes, setRecipes] = useState<any[]>([]);

  const BASE_URL = " https://api.edamam.com/api";

  // useEffect(() => {
  //   const fetchRecipeResults = async () => {
  //     try {
  //       const resp = await fetch(
  //         BASE_URL +
  //           "/recipes/v2?type=public&app_id=1943fc10&app_key=b063254aac0d036d283313ac3023c22f&q=" +
  //           debouncedSearchTerm
  //       );
  //       const data = await resp.json();
  //       setRecipes(data.hits);
  //     } catch (error) {
  //       console.error("Error fetching recipes;", error);
  //     }
  //   };
  // }, [debouncedSearchTerm]);

  const handleRecipeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/discover?recipeQuery=${recipeQuery}`);
  };
  useEffect(() => {
    setRecipeQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex  mt-8 justify-center items-center rounded-xl"
    >
      {" "}
      <TextField
        label={
          <>
            <SearchIcon className="fill-red-600 w-[33px] h-[33px] text-center mx-7" />{" "}
            Enter an ingredient
          </>
        }
        variant="outlined"
        placeholder=" "
        size="medium"
        className="mx-10 mb-10"
        onChange={handleRecipeQuery}
        value={recipeQuery}
        sx={{
          width: 1220,
          borderRadius: 30,
          display: "flex",
        }}
      />
    </form>
  );
};

export default SearchBar;
