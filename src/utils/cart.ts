import { getCostAndQuantity } from "@src/utils/product";
import { CurrencyPrice } from "@src/store/currency/currencyTypes";
import { BackendCartItem } from "@src/store/cart/cartTypes";
import constants from "@src/constants/constants";
import { ID_CHIPASSIST, ID_ELFARO, ID_MASTER } from "@src/constants/server_constants";

export const cartCost = (items: BackendCartItem[], currencyPrice: CurrencyPrice) => {
  return items.reduce((acc, val) => {
    const { price } = getCostAndQuantity(val.quantity || 1, val.stockrecord);

    return price?.price ? acc + val.quantity * currencyPrice(price?.price, val.stockrecord?.price_currency) : acc;
  }, 0);
};

export const getTotalPrices = (cost: number, serviceTax: number, currencyPrice: CurrencyPrice) => {
  let tax = cost * (serviceTax / 100);
  if ([ID_MASTER, ID_CHIPASSIST, ID_ELFARO].includes(constants.id)) {
    const minTax = currencyPrice(20, "EUR");
    if (tax < minTax) tax = minTax;
  }
  const result = cost + tax;
  return { cost, tax, result };
};

export default "cart fn";
