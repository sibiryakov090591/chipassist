import { getDateLag } from "@src/utils/date";
import { Product, Stockrecord } from "@src/store/products/productTypes";
import { getDynamicMoq, getPrice } from "@src/utils/product";
import { CurrencyPrice } from "@src/store/currency/currencyTypes";
import { Item } from "./productSelectModalTypes";

export const pushIn = (
  arr: { id: number | string; name: number | string }[],
  val_id: number | string,
  val_name: number | string,
): void => {
  if (!arr.find((v) => v.name === val_name)) {
    arr.push({ id: val_id, name: val_name });
  }
};

export const createItem = (
  currencyPrice: CurrencyPrice,
  product: Product,
  stockrecord: Stockrecord,
  productForSave: any,
  qty: number,
  orderRef: number,
  rowKey?: string,
  isRfq: any = 0,
): Item => {
  // const { moq } = stockrecord && stockrecord.id ? getCostAndQuantity(stockrecord.id, qty, { items: [stockrecord] }, stockrecord.id) : { moq: 0 };
  const moq = getDynamicMoq(stockrecord);

  return {
    stockrecord,
    rowKey,
    id: stockrecord?.id.toString() + rowKey || "",
    product,
    productId: product?.id,
    productTitle: `${product?.manufacturer ? product?.manufacturer.name : "" || ""} ${product?.upc}`,
    productDescription: product?.description,
    upc: product?.upc,
    manufacturer: `${product?.manufacturer ? product?.manufacturer.name : "" || ""}`,
    part_number: product?.upc,
    distributor: stockrecord?.partner_name,
    moq,
    mpq: stockrecord?.mpq,
    num_in_stock: stockrecord?.num_in_stock,
    lead_period: stockrecord?.lead_period,
    lead_period_str: stockrecord?.lead_period_str,
    price: currencyPrice(getPrice(productForSave?.qty || qty, stockrecord), stockrecord?.price_currency),
    qty: productForSave?.qty || "",
    updated: new Date(stockrecord?.date_updated).getTime(),
    updatedVal: stockrecord ? getDateLag(new Date(), new Date(stockrecord?.date_updated)) : "",
    disabled: !stockrecord?.num_in_stock || !stockrecord?.prices.length,
    orderRef,
    rfq: isRfq,
  };
};
