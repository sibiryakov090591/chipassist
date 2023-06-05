export const getInitialCurrency = (urlParam = null) => {
  let selectedCurrency = urlParam;
  if (window.location.pathname === "/supplier-response") selectedCurrency = "USD";
  if (!selectedCurrency) selectedCurrency = localStorage.getItem("currency");
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
