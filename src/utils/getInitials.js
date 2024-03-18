import constants from "@src/constants/constants";
import { ID_PCBONLINE, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";

export const getInitialCurrency = (urlParam = null) => {
  let selectedCurrency = urlParam;
  if (!selectedCurrency) selectedCurrency = localStorage.getItem("currency");
  if (!selectedCurrency && [ID_SUPPLIER_RESPONSE, ID_PCBONLINE].includes(constants.id)) selectedCurrency = "USD";
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
