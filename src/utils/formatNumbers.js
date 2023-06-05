/* eslint-disable no-param-reassign */
// eslint-disable-next-line consistent-return
export function formatNumber(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    // eslint-disable-next-line no-restricted-globals
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

export default "func";
