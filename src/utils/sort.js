/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
export function descendingComparator(a, b, orderBy, orderByAlternative) {
  let res = compare((a[orderBy] || "").toString().toUpperCase(), (b[orderBy] || "").toString().toUpperCase());

  if (res === 0 && !!orderByAlternative) {
    res = compare(
      (a[orderByAlternative] || "").toString().toUpperCase(),
      (b[orderByAlternative] || "").toString().toUpperCase(),
    );
  }

  return res;
}

export function compare(a, b) {
  if (isNumberString(a) && isNumberString(b)) {
    if (parseFloat(b) < parseFloat(a)) {
      return -1;
    }
    if (parseFloat(b) > parseFloat(a)) {
      return 1;
    }
  } else {
    return strcmp(a, b);
  }

  return 0;
}

export function getComparator(order, orderBy, orderByAlternative = "") {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, orderByAlternative)
    : (a, b) => -descendingComparator(a, b, orderBy, orderByAlternative);
}

export function stableSort(array, comparator) {
  if (!array) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const isNumberString = (val) => {
  return /^[0-9]+(\.)?[0-9]*$/.test(val);
};

export function strcmp(a, b) {
  for (var i = 0, n = Math.max(a.length, b.length); i < n && a.charAt(i) === b.charAt(i); ++i);
  if (i === n) return 0;
  return a.charAt(i) > b.charAt(i) ? -1 : 1;
}
