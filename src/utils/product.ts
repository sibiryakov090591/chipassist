import isEqual from "lodash/isEqual";
import { Product, ProductStateItem, Stockrecord } from "@src/store/products/productTypes";
import { RfqItem } from "@src/store/rfq/rfqTypes";
import { addApiUrl } from "@src/utils/transformUrl";
import { isUrl } from "@src/utils/validation";
import { getComparator, stableSort } from "./sort";

const isImage = require("is-image");
const placeholderImg = require("@src/images/cpu.png");

export const getAttributes = (
  data: ProductStateItem,
): {
  [key: string]: {
    name: string;
    value: string | number | string[] | number[];
  }[];
} => {
  if (!data || !data.attributes) return {};
  const groups: {
    [key: string]: {
      name: string;
      value: string | number | string[] | number[];
    }[];
  } = {};
  const attributes = data.attributes.filter((attr) => attr.value && !isUrl(attr.value) && attr.name !== "Manufacturer");
  attributes.forEach((val) => {
    let group_name = "Others";
    if (val.group) group_name = val.group.name;
    const item = { name: val.name === "Lead Time" ? "Manufacturer Lead Time" : val.name, value: val.value };

    if (groups[group_name]) {
      groups[group_name].push(item);
    } else {
      groups[group_name] = [item];
    }
  });

  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  });

  const result = sortedKeys.reduce((acc: any, val) => {
    acc[val] = groups[val];
    return acc;
  }, {});

  return result;
};

export const getDynamicMoq = (stockrecord: Stockrecord) => {
  let moq = stockrecord?.moq || 1;
  const mpq = stockrecord?.mpq || 1;

  const prices = pricesSort(stockrecord?.prices);

  if (prices.length && prices[0].amount > moq) {
    moq = prices[0].amount;
  }

  if (!!stockrecord?.num_in_stock && moq > stockrecord?.num_in_stock) moq = stockrecord.num_in_stock;

  if (mpq > 1) {
    const packs = Math.floor(moq / mpq);
    const excess = moq - packs * mpq;
    if (excess > 0) {
      moq = (packs + 1) * mpq;
    }
  }

  return moq;
};

export const getDefaultQty = (moq: number, stock: number) => (moq > stock ? stock : moq);

export const validateQuantity = (quantity: number, stockrecord: Stockrecord) => {
  let response = null;
  let validQuantity = quantity;
  let validLowQuantity = quantity || 1;
  const mpq = stockrecord?.mpq || 1;
  const dynamicMoq = getDynamicMoq(stockrecord);

  if (mpq > 1) {
    const packs = Math.floor(validQuantity / mpq);
    const excess = validQuantity - packs * mpq;
    if (excess > 0) {
      validQuantity = (packs + 1) * mpq;
      validLowQuantity = packs * mpq;
    }
  }

  if (quantity !== validQuantity) {
    response = { amount: mpq, i18message: "distributor.min_mpq_error", validLowQuantity };
  }
  if (quantity < dynamicMoq) {
    response = { amount: dynamicMoq, i18message: "distributor.min_qty_error", validLowQuantity };
  }
  return response;
};

// examples: add to cart
export const getValidQuantityPriceStatus = (quantity: number, stockrecord: Stockrecord, isRfq = 0) => {
  const moq = getDynamicMoq(stockrecord);
  const isOnline = isProductAvailable(stockrecord) && quantity >= moq;

  let validQuantity = validateQuantity(quantity, stockrecord)?.validLowQuantity;
  if (!validQuantity || validQuantity > stockrecord.num_in_stock)
    if (!isRfq && isOnline) {
      validQuantity =
        stockrecord?.num_in_stock >= quantity
          ? quantity
          : validateQuantity(stockrecord?.num_in_stock, stockrecord)?.validLowQuantity || stockrecord?.num_in_stock;
    } else {
      validQuantity = validateQuantity(quantity, stockrecord)?.validLowQuantity || quantity;
    }
  if (!validQuantity) validQuantity = moq;

  const { price } = getCostAndQuantity(validQuantity || 1, stockrecord, true);

  return { quantity: isOnline ? validQuantity : quantity, isOnline, price };
};

export const getCostAndQuantity = (quantity: number, stockrecord: Stockrecord, strict = false) => {
  if (!stockrecord) {
    return { price: {}, quantity: 0, cost: 0, moq: 0 };
  }
  let amount: number = null;
  let p: any = {};
  const dynamicMoq = getDynamicMoq(stockrecord);
  const mpq = stockrecord ? stockrecord.mpq || 1 : 1;
  let lineQuantity = strict ? quantity : Math.max(quantity || 0, (dynamicMoq as number) || 1);
  if (mpq > 1) {
    const packs = Math.floor(lineQuantity / mpq);
    const excess = lineQuantity - packs * mpq;
    if (excess > 0) {
      lineQuantity = (packs + 1) * mpq;
    }
  }

  const costs: Stockrecord["prices"] = stockrecord
    ? stableSort(stockrecord?.prices, getComparator("asc", "amount", "price"))
    : [];

  for (let i = 0; i < costs.length; i += 1) {
    if (!costs[i].price) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (costs[i].amount > lineQuantity) break;
    p = costs[i];
    amount = costs[i].amount;
  }
  const cost = p ? p.price * lineQuantity : "";

  return { price: p || {}, quantity: lineQuantity, cost, moq: dynamicMoq, amount };
};

export const getNextBiggerPriceBreak = (qty: number, stockrecord: Stockrecord) => {
  if (!stockrecord?.id) return null;
  return pricesSort(stockrecord.prices).find((price) => price.amount >= qty);
};

export const getPrice = (qty: number, stockrecord: Stockrecord, showBiggerPrice = true): number => {
  if (!stockrecord?.id) return null;
  const { price } = getCostAndQuantity(qty, stockrecord);
  return !showBiggerPrice && price.amount > qty ? null : price?.price || null;
};

// ONLY FOR DISPLAY IN MOBILE PRICES SECTION
export const getQtyPrice = (qty: number, stockrecord: Stockrecord): any => {
  const price = getCostAndQuantity(qty, stockrecord);
  return price;
};

// ONLY FOR DISPLAY IN PRICES SECTION
export const getAllPrices = (stockrecord: Stockrecord) => {
  if (!stockrecord) return [] as any;
  let amountArray = [1, 10, 100, 1000, 10000];
  if (stockrecord?.prices) {
    amountArray = [...new Set([...stockrecord?.prices.map((v) => v.amount), ...amountArray])].sort((a, b) => a - b);
  }
  const prices = new Map();
  amountArray.forEach((amount) => {
    prices.set(amount, amount >= stockrecord.moq ? getPrice(amount, stockrecord) : null);
  });
  return prices;
};

export const isProductAvailable = (
  stockrecord: Stockrecord,
  minQty = 1,
  ignoreErrors: string[] = null,
  // stockList: number[] = null
) => {
  const isInStock = stockrecord?.num_in_stock >= (minQty || 1);
  // const moqMoreStock = stockrecord?.num_in_stock < getDynamicMoq(stockrecord);
  // const isPrice = getPrice(minQty, stockrecord);
  const isHasErrors = ignoreErrors
    ? !!stockrecord?.errors?.length && !!stockrecord.errors.filter((err) => !ignoreErrors.includes(err.message)).length
    : !!stockrecord?.errors?.length;

  // const includedWhiteList = stockList ? stockList.some((sellerId) => sellerId === stockrecord?.partner) : true;

  // return isInStock && isPrice && !isHasErrors && !moqMoreStock && includedWhiteList;
  return !isHasErrors && isInStock;
};

export const isProductRequested = (rfqs: RfqItem[], part_number: string, partner_id: number) =>
  rfqs?.some((v) => v.part_number === part_number && v.seller.find((s) => s.id === partner_id));

export const getImage = (product: Product) => {
  // const placeholderImg = "https://res.cloudinary.com/chipassist/image/upload/c_scale,w_60/v1625817264/chip_vxnrpf.png";
  const attr_image = product && product.attributes?.find((val) => val.code === "product-image");

  return product?.images?.length > 0 && isImage(product.images[0].original)
    ? addApiUrl(product.images[0].original)
    : (attr_image && isImage(attr_image.value as string) && attr_image.value) || placeholderImg;
};

export const isDuplicateStockrecord = (haystack: Stockrecord[], needle: Stockrecord) => {
  const filteredHeystack = haystack.filter((v) => v?.id).filter((val) => val.id !== needle.id);
  const templateRfq = (st: Stockrecord) => ({
    // status: st.status,
    moq: st.moq,
    mpq: st.mpq,
    prices: st?.prices.map((v) => ({ amount: v.amount, price: v.price })).sort((a, b) => a.amount - b.amount),
    num_in_stock: st.num_in_stock,
    lead_period_str: st.lead_period_str,
    // lead_period: st.lead_period,
  });
  const templateOnline = (st: Stockrecord) => ({
    ...templateRfq(st),
    manufacturerId: st.manufacturer?.id,
    partner: st.partner,
    partner_sku: st.partner_sku,
  });
  return filteredHeystack.some((val) => {
    // const template = isProductAvailable(needle) && isProductAvailable(val) ? templateOnline : templateRfq;
    const template = templateOnline;
    return isEqual(template(needle), template(val));
  });
};

export const getStockDataCode = (stock: any) => {
  if (!stock?.partner_sku?.includes("datecode:")) return null;
  return stock.partner_sku.split("datecode:")[1]?.trim() || null;
};

function pricesSort(prices: Stockrecord["prices"]): Stockrecord["prices"] {
  return prices ? stableSort(prices, getComparator("asc", "amount", "price")) : [];
}
