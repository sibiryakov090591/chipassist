/* eslint-disable no-useless-escape */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const uniqueFromTwoArrays = (arr1, arr2) => {
  const arr = [];
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr.indexOf(arr1[i]) === -1) {
      arr.push(arr1[i]);
    }
  }
  for (let i = 0; i < arr2.length; i += 1) {
    if (arr.indexOf(arr2[i]) === -1) {
      arr.push(arr2[i]);
    }
  }
  return arr;
};

export const normalizeData = (data) => {
  const o = {};
  const m = [];
  for (let c = 0; c < data.length; c += 1) {
    const val = data[c];
    if (val) {
      m.push(val.id);
      val.parentId = 0;
      o[val.id] = val;
    }
  }
  return { o, m };
};

export const normalizeAttributeData = (data) => {
  const o = {};
  const m = [];
  for (let c = 0; c < data.length; c += 1) {
    const val = data[c];
    m.push(val.code);
    o[val.code] = val;
  }
  return { o, m };
};

export const getUniqueId = () => {
  return `id${Math.random().toString(16).slice(2)}`;
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const moveCursorToEnd = (id) => () => {
  const el = document.getElementById(id);
  el.focus();
  if (typeof el.selectionStart === "number") {
    // eslint-disable-next-line no-multi-assign
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange !== "undefined") {
    const range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
};

export const getUtm = () => {
  const utm = window.location.search
    ?.replace("?", "")
    .split("&")
    .reduce((acc, par) => {
      const [name, value] = par.split("=");
      if (name.includes("utm_") && value) return { ...acc, [name]: value };
      return acc;
    }, null);
  if (!utm) return null;
  const referer = document.referrer;
  return { ...utm, referer };
};

/**
 * @param lazyComponent: function - a function that returns a dynamic import
 * @param attemptsLeft: number - count of download attempts
 * @returns Promise
 */
export const lazyLoader = (lazyComponent, attemptsLeft = 1) => {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error) => {
        if (attemptsLeft <= 0) {
          reject(error);
          return;
        }
        fetch("/version.txt")
          .then((res) => {
            return res.ok ? res.text() : null;
          })
          .catch(() => {
            return null;
          })
          .then((res) => {
            console.log("***LOADED_VERSION.TXT: ", res);
            if (res && res !== (process.env.AWS_COMMIT_ID || COMMITHASH)) {
              window.location.reload();
            } else {
              setTimeout(() => {
                console.log("***RELOAD_LAZY_COMPONENT");
                lazyLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject);
              }, 1500); // let's try to load again in 1500ms
            }
          });
      });
  });
};
