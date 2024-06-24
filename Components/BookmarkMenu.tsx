import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import variables from "../variable.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";

const RecipeBookmark = ({
  recipeQuery,
  bookmarkedRecipe,
  setBookmarkedRecipe,
}: {
  recipeQuery: string;
  bookmarkedRecipe: string[];
  setBookmarkedRecipe: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveBookmark = (recipeId: string) => {
    setBookmarkedRecipe((prevBookmarkedRecipes) =>
      prevBookmarkedRecipes.filter((id) => id !== recipeId)
    );
  };

  const bookmarkedRecipeList = recipes.filter((recipe) =>
    bookmarkedRecipe.includes(recipe.id)
  );

  const BASE_URL =
    " https://api.edamam.com/api/recipes/v2?type=public&app_id=1943fc10&app_key=b063254aac0d036d283313ac3023c22f&q=";

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

  return (
    <>
      <div className={"justify-end"}>
        <FavoriteIcon width={28} height={28} onClick={handleToggle} />
      </div>
      <>
        {isOpen && (
          <>
            <div
              className={
                "fixed top-0 bottom-0 w-full h-full bg-black/55 z-[999]"
              }
              onClick={handleToggle}
            />
            <div
              className={
                "bg-black w-screen max-h-auto bottom-0 left-1/2 fixed rounded-t-lg translate-x-1/2 overflow-y-auto flex flex-col p-[24px] box-content"
              }
            >
              <CloseIcon
                className={""}
                width={60}
                height={60}
                onClick={handleToggle}
              />
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {bookmarkedRecipeList.map((recipe) => (
                  <div
                    className={variables.bookmarkListItem}
                    key={recipe.recipe.uri}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Image
                        src={recipe.recipe.image}
                        alt={recipe.recipe.label}
                        width={54}
                        height={54}
                        className={"rounded-smm w-[54px] h-[54px] pb-[10px]"}
                        style={{ marginRight: "10px" }}
                      />

                      <span style={{ flexGrow: 1, color: "white" }}>
                        {recipe.recipe.label}
                      </span>
                      <button
                        onClick={() => handleRemoveBookmark(recipe.recipe.uri)}
                        style={{
                          marginLeft: "10px",
                          color: "white",
                          backgroundColor: "#3F3F46",
                          borderRadius: "24px",
                          padding: "10px",
                          width: "85px",
                          height: "auto",
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default RecipeBookmark;
