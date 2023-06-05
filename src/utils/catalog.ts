export const findCategory = (id: number, state: any) => {
  let cat: any = null;

  state.forEach((topCategory: any) => {
    if (topCategory.id === id) {
      cat = { ...topCategory };
    } else if (!cat) {
      // Depth = 2
      topCategory.children.forEach((depth_2: any) => {
        if (depth_2.id === id) {
          cat = { ...depth_2 };
        } else if (!cat) {
          // Depth = 3
          depth_2.children.forEach((depth_3: any) => {
            if (depth_3.id === id) {
              cat = { ...depth_3 };
            } else if (!cat) {
              // Depth = 4
              depth_3.children.forEach((depth_4: any) => {
                if (depth_4.id === id) {
                  cat = { ...depth_4 };
                } else if (!cat) {
                  // Depth = 5
                  depth_4.children.forEach((depth_5: any) => {
                    if (depth_5.id === id) {
                      cat = { ...depth_5 };
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  return cat;
};

export default "test";
