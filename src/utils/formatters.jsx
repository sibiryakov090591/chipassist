import React from "react";
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = " ") {
  try {
    if (amount === Infinity) return <span style={{ fontSize: "0.8rem" }}>loading</span>;
    if (amount === 0) return 0;
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = amount ? Math.trunc(amount).toString() : "";
    const j = i.length > 3 ? i.length % 3 : 0;

    if ((amount - i).toFixed(2) >= 1) {
      // if toFixed return 1.00 => i++ and remove ".00"
      i = +i + 1;
      i = i.toString();
    }

    const res =
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimalCount
        ? decimal +
          Number(amount - i)
            .toFixed(i === "0" && amount - i < 1 ? 4 : decimalCount)
            .slice(2)
        : "");
    return res.replace(/[.]+/gi, ".");
  } catch (e) {
    console.log(e);
  }
}

export function formatNumber(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    const i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
