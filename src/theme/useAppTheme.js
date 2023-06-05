import constants from "@src/constants/constants";
import ThemeStylesChipAssist from "@src/theme/ThemeStylesChipAssist";
import ThemeStylesICsearch from "@src/theme/ThemeStylesICsearch";
import { ID_CHIPASSIST, ID_ELFARO, ID_ICSEARCH, ID_MASTER } from "@src/constants/server_constants";
import ThemeStylesElfaro from "@src/theme/ThemeStylesElfaro";

let useAppTheme;

switch (constants.id) {
  case ID_ICSEARCH:
    useAppTheme = ThemeStylesICsearch;
    break;
  case ID_CHIPASSIST:
    useAppTheme = ThemeStylesChipAssist;
    break;
  case ID_MASTER:
    useAppTheme = ThemeStylesChipAssist;
    break;
  case ID_ELFARO:
    useAppTheme = ThemeStylesElfaro;
    break;

  default:
    useAppTheme = ThemeStylesChipAssist;
}

const antiESLint = useAppTheme;

export default antiESLint;
