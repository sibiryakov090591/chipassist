import constants from "@src/constants/constants";
import { ID_CHIPASSIST, ID_ELFARO, ID_ICSEARCH, ID_MASTER } from "@src/constants/server_constants";
import paletteChipAssist from "./paletteChipAssist";
import paletteICsearch from "./paletteICsearch";
import paletteElfaro from "./paletteElfaro";

let palette;
switch (constants.id) {
  case ID_ICSEARCH:
    palette = paletteICsearch;
    break;
  case ID_CHIPASSIST:
    palette = paletteChipAssist;
    break;
  case ID_MASTER:
    palette = paletteChipAssist;
    break;
  case ID_ELFARO:
    palette = paletteElfaro;
    break;

  default:
    palette = paletteChipAssist;
}

const antiESLint = palette;

export default antiESLint;
