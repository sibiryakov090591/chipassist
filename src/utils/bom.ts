import { getCostAndQuantity } from "@src/utils/product";
import { CurrencyPrice } from "@src/store/currency/currencyTypes";
import { BomInitialState, GroupItem, Row } from "@src/store/bom/bomTypes";
import { Product, Stockrecord } from "@src/store/products/productTypes";

export const bomCost = (items: BomInitialState["items"], currencyPrice: CurrencyPrice, approved = false) => {
  return Object.values(items)
    .filter((val) => (approved ? val.approved : true))
    .reduce((acc, val) => {
      const stockrecord = (val.product as Product)?.stockrecords?.find((v) => v.id === val.stockrecord);
      const { price } = getCostAndQuantity(val.quantity || 1, stockrecord);

      return price?.price ? acc + val.quantity * currencyPrice(price?.price, stockrecord?.price_currency) : acc;
    }, 0);
};

export const isShowBetterPriceHint = (
  groupData: GroupItem[],
  groupItems: Row[],
  productModalItems: any[],
  currencyPrice: CurrencyPrice,
) => {
  if (!productModalItems || !groupItems?.length)
    return {
      isShowPriceHint: false,
      price: 0,
      betterStockrecord: null,
      betterProduct: null,
    };

  const bomlistSrWithlessPrice = groupData?.sort(
    (a, b) =>
      currencyPrice(a.unitPrice, a.stockrecord?.price_currency) -
      currencyPrice(b.unitPrice, b.stockrecord?.price_currency),
  )[0];

  const lessPriceFromBom = currencyPrice(
    bomlistSrWithlessPrice?.unitPrice,
    bomlistSrWithlessPrice?.stockrecord?.price_currency,
  );

  const allModalStockrecords: any[] = [];
  productModalItems.forEach((item: any) => {
    item.stockrecords
      // Remove bom stockrecords duplicate
      .filter((sr: Stockrecord) => {
        return !groupData.some((i) => i.stockrecord?.id === sr.id);
      })
      .forEach((sr: Stockrecord) => {
        const newSr = { ...sr, product: item.id };
        allModalStockrecords.push(newSr);
      });
  });

  const modalSrWithLessPrice = allModalStockrecords.sort(
    (a: any, b: any) =>
      currencyPrice(getCostAndQuantity(groupItems[0].quantity_ref, a)?.price?.price, a.price_currency) -
      currencyPrice(getCostAndQuantity(groupItems[0].quantity_ref, b)?.price?.price, b.price_currency),
  )[0];

  const lessPriceFromModal = currencyPrice(
    getCostAndQuantity(groupItems[0].quantity_ref, modalSrWithLessPrice)?.price?.price,
    modalSrWithLessPrice?.price_currency,
  );

  const betterProduct = productModalItems.find((prod) => prod?.id === modalSrWithLessPrice?.product);

  return {
    isShowPriceHint: lessPriceFromBom > lessPriceFromModal,
    price: lessPriceFromModal,
    betterStockrecord: modalSrWithLessPrice,
    betterProduct,
  };
};

export const isEven = (number: number) => {
  return number % 2 === 0;
};

export default "bom fn";
