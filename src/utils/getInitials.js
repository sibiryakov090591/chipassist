import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";

export const getInitialCurrency = (urlParam = null) => {
  let selectedCurrency = urlParam;
  if (!selectedCurrency) selectedCurrency = localStorage.getItem("currency");
  if (!selectedCurrency && constants.id === ID_SUPPLIER_RESPONSE) selectedCurrency = "USD";
  if (selectedCurrency) selectedCurrency = selectedCurrency.toUpperCase();
  if (!["EUR", "RUB", "USD"].includes(selectedCurrency)) selectedCurrency = null;
  return selectedCurrency;
};

export default (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");
