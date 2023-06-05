const slice = (part: string, state: string[]) => {
  if (!state.includes(part)) state.push(part);
  if (part.length > 3) {
    slice(part.slice(0, part.length - 1), state);
    slice(part.slice(1, part.length), state);
  }
};

export const splitForHighlighter = (searchQuery: string, textToHighlight = "") => {
  if (searchQuery.length > 15) return simpleSplitForHighlighter(searchQuery);

  let res: string[] = [];
  if (!searchQuery) return res;

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

export const fixedStickyContainerHeight = (open: boolean) => {
  const stickyContainer = document.querySelector("#filters_sticky_container") as HTMLElement | null;
  if (!stickyContainer) return false;

  stickyContainer.style.minHeight = open ? `${stickyContainer.offsetHeight}px` : "auto";
  return false;
};

export default "test";
