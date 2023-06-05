import { getDynamicMoq, getPrice, validateQuantity, getValidQuantityPriceStatus } from "@src/utils/product";

import { Stockrecord } from "../store/products/productTypes";

const prices = [
  { amount: 1, price: 1 },
  { amount: 10, price: 10 },
  { amount: 100, price: 100 },
  { amount: 1000, price: 1000 },
  { amount: 10000, price: 10000 },
];

const stockrecord = {
  id: 1,
  moq: 1,
  mpq: 1,
  prices,
};

test("moq 1 prices", () => {
  expect(getPrice(1, stockrecord as Stockrecord)).toBe(1);
  expect(getPrice(10, stockrecord as Stockrecord)).toBe(10);
  expect(getPrice(100, stockrecord as Stockrecord)).toBe(100);
  expect(getPrice(1000, stockrecord as Stockrecord)).toBe(1000);
  expect(getPrice(10000, stockrecord as Stockrecord)).toBe(10000);
});

const stockrecord_moq_100 = { ...stockrecord, moq: 100 };
test("PRICE. moq 100 prices", () => {
  expect(getPrice(1, stockrecord_moq_100 as Stockrecord)).toBe(100);
  expect(getPrice(10, stockrecord_moq_100 as Stockrecord)).toBe(100);
  expect(getPrice(100, stockrecord_moq_100 as Stockrecord)).toBe(100);
  expect(getPrice(1000, stockrecord_moq_100 as Stockrecord)).toBe(1000);
  expect(getPrice(10000, stockrecord_moq_100 as Stockrecord)).toBe(10000);
});

const stockrecord_moq_15000 = { ...stockrecord, moq: 15000 };
test("PRICE. moq 15000 prices", () => {
  expect(getPrice(1, stockrecord_moq_15000 as Stockrecord)).toBe(10000);
  expect(getPrice(10, stockrecord_moq_15000 as Stockrecord)).toBe(10000);
  expect(getPrice(100, stockrecord_moq_15000 as Stockrecord)).toBe(10000);
  expect(getPrice(1000, stockrecord_moq_15000 as Stockrecord)).toBe(10000);
  expect(getPrice(10000, stockrecord_moq_15000 as Stockrecord)).toBe(10000);
});

const stockrecord_moq_1_prices_100 = { ...stockrecord, moq: 1, prices: stockrecord.prices.slice(2) };
test("PRICE. moq 1 prices from 100", () => {
  expect(getPrice(1, stockrecord_moq_1_prices_100 as Stockrecord)).toBe(100);
  expect(getPrice(10, stockrecord_moq_1_prices_100 as Stockrecord)).toBe(100);
  expect(getPrice(100, stockrecord_moq_1_prices_100 as Stockrecord)).toBe(100);
  expect(getPrice(1000, stockrecord_moq_1_prices_100 as Stockrecord)).toBe(1000);
  expect(getPrice(10000, stockrecord_moq_1_prices_100 as Stockrecord)).toBe(10000);
});

test("MOQ. moq & mpq", () => {
  expect(getDynamicMoq({ ...stockrecord, moq: 1, mpq: 2 } as Stockrecord)).toBe(2);
  expect(getDynamicMoq({ ...stockrecord, moq: 2, mpq: 2 } as Stockrecord)).toBe(2);
  expect(getDynamicMoq({ ...stockrecord, moq: 3, mpq: 2 } as Stockrecord)).toBe(4);
});

test("QTY. mpq test", () => {
  expect(validateQuantity(3, { moq: 1, mpq: 2 } as Stockrecord).validLowQuantity).toBe(2);
  expect(validateQuantity(39, { moq: 1, mpq: 10 } as Stockrecord).amount).toBe(10);
});

test("Valid. 1qty, 1moq, 1mpq", () => {
  const { quantity, price, isOnline } = getValidQuantityPriceStatus(1, {
    id: 1,
    moq: 1,
    mpq: 1,
    num_in_stock: 1,
    partner: 7,
    prices,
  } as Stockrecord);
  expect(quantity).toBe(1);
  expect(price.price).toBe(1);
  expect(isOnline).toBe(true);
});

test("Valid. 1qty, 10moq, 1mpq", () => {
  const { quantity, price, isOnline } = getValidQuantityPriceStatus(1, {
    id: 1,
    moq: 10,
    mpq: 1,
    num_in_stock: 20,
    partner: 7,
    prices,
  } as Stockrecord);
  expect(quantity).toBe(1);
  expect(price.price).toBe(1);
  expect(isOnline).toBe(false);
});

test("Valid. 19qty, 1moq, 10mpq", () => {
  const { quantity, price, isOnline } = getValidQuantityPriceStatus(19, {
    id: 1,
    moq: 1,
    mpq: 10,
    num_in_stock: 20,
    partner: 7,
    prices,
  } as Stockrecord);
  expect(isOnline).toBe(true);
  expect(quantity).toBe(10);
  expect(price.price).toBe(10);
});

test("Valid. 19qty, 1moq, 1mpq, 10stock", () => {
  const { quantity, price, isOnline } = getValidQuantityPriceStatus(19, {
    id: 1,
    moq: 1,
    mpq: 1,
    num_in_stock: 10,
    partner: 7,
    prices,
  } as Stockrecord);
  expect(isOnline).toBe(true);
  expect(quantity).toBe(10);
  expect(price.price).toBe(10);
});

test("Valid. 19qty, 1moq, 20mpq, 10stock", () => {
  const { quantity, price, isOnline } = getValidQuantityPriceStatus(19, {
    id: 1,
    moq: 1,
    mpq: 20,
    num_in_stock: 10,
    partner: 7,
    prices,
  } as Stockrecord);
  expect(isOnline).toBe(false);
  expect(quantity).toBe(19);
  expect(price.price).toBe(10);
});
