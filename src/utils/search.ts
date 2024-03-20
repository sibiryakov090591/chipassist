const slice = (part: string, state: string[]) => {
  if (!state.includes(part)) state.push(part);
  if (part.length > 3) {
    slice(part.slice(0, part.length - 1), state);
    slice(part.slice(1, part.length), state);
  }
};

export const splitForHighlighter = (search: string, textToHighlight = "") => {
  if (!search) return [];
  const searchQuery = ["SELLER:", "MANUFACTURER:"].includes(search)
    ? search.replace(/^(SELLER:|MANUFACTURER:)/, "")
    : search;
  if (searchQuery.length > 15) return simpleSplitForHighlighter(searchQuery);

  let res: string[] = [];
  const parts = searchQuery.toLowerCase().trim().split(" ");
  parts.forEach((part) => {
    if (part.length >= 3) {
      slice(part, res);
    }
  });
  res = res.filter((i) => textToHighlight.toLowerCase().includes(i));

  // Filtering out smaller matches
  return res.filter((i, index) => {
    return res.every((item, itemIndex) => {
      if (index === itemIndex) return true;
      return !item.includes(i);
    });
  });
};

export const simpleSplitForHighlighter = (searchQuery: string) => {
  const res: string[] = [];
  if (!searchQuery) return res;

  const parts = searchQuery.toLowerCase().trim().split(" ");
  parts.forEach((part) => {
    for (let i = part.length; i > 3; i -= 1) {
      res.push(part.slice(i - 4, i));
    }
  });

  return res;
};

export const splitCyrillicLetters = (searchQuery: string) => {
  const res: string[] = [];
  if (!searchQuery) return res;

  const letters = searchQuery.split("");
  letters.forEach((letter) => {
    if (/[А-ЯЁ]/.test(letter)) {
      res.push(letter);
    }
  });

  return res;
};

export const getSuggestionsFromCyrillic = (searchQuery: string) => {
  if (!searchQuery) return [];

  const cyrillicToLatinMapping: any = {
    А: "A",
    Б: "B",
    В: ["V", "B"],
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "ZH",
    З: "Z",
    И: "I",
    Й: "I",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: ["R", "P"],
    С: ["S", "C"],
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "TS",
    Ч: "CH",
    Ш: "SH",
    Щ: "SHCH",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "A",
    Ю: "YU",
    Я: "YA",
  };
  const queryLetters = searchQuery.split("");
  const countOfSuggestions = /В|Р|С/.test(searchQuery) ? 2 : 1; // max of options if query contains a letter with multiply options
  const res = new Array(countOfSuggestions).fill(queryLetters).map((i) => [...i]); // fill doesn't create new arrays

  queryLetters.forEach((queryLetter, queryLetterIndex) => {
    if (cyrillicToLatinMapping[queryLetter]) {
      if (Array.isArray(cyrillicToLatinMapping[queryLetter])) {
        cyrillicToLatinMapping[queryLetter].forEach((mappingLetter: string, mappingLetterIndex: number) => {
          res[mappingLetterIndex][queryLetterIndex] = mappingLetter;
        });
      } else {
        res.forEach((suggestionArray) => {
          // eslint-disable-next-line no-param-reassign
          suggestionArray[queryLetterIndex] = cyrillicToLatinMapping[queryLetter];
        });
      }
    }
  });

  return res.map((arr: any) => arr.join(""));
};

export const fixedStickyContainerHeight = (open: boolean) => {
  const stickyContainer = document.querySelector("#filters_sticky_container") as HTMLElement | null;
  if (!stickyContainer) return false;

  stickyContainer.style.minHeight = open ? `${stickyContainer.offsetHeight}px` : "auto";
  return false;
};

export default "test";
