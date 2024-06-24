import { inter } from "@/app/font";
import variables from "../variable.module.scss";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecipeBookmark from "./BookmarkMenu";

const TitleHeader = () => {
  return (
    <div className="flex justify-center items-center  p-[70px] tracking-[7px] text-2xl ">
      <div>
        <Link href={"/ "}>
          <p className="justify-center">RecipeMe</p>
        </Link>{" "}
      </div>
      <div></div>
    </div>
  );
};

export default TitleHeader;
