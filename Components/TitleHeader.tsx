import { inter } from "@/app/font";
import variables from "../variable.module.scss";

const TitleHeader = () => {
  return (
    <div className={variables.titleHeader}>
      <p className={inter.className}>RecipeMe</p>
    </div>
  );
};

export default TitleHeader;
