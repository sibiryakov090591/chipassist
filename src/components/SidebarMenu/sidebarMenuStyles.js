import palette from "@src/themes/palette";
import { materialColors, themeColors } from "../../theme";

const back = themeColors.white;
const styles = {
  tree: {
    base: {
      listStyle: "none",
      backgroundColor: back,
      margin: 0,
      fontSize: "14px",
      overflowY: "auto",
      maxHeight: "100vh",
    },
    node: {
      base: {
        position: "relative",
      },
      active_container: {
        cursor: "pointer",
        position: "relative",
        padding: "0px 20px",
        display: "flex",
        alignItems: "center",
        minHeight: "67px",
        background: back,
        fontWeight: "bold",
        color: themeColors.dark_blue,
      },

      link: {
        cursor: "pointer",
        position: "relative",
        padding: "0px 20px",
        display: "flex",
        alignItems: "center",
        minHeight: "67px",
      },
      toggled: {
        display: "flex",
        position: "relative",
        cursor: "pointer",
        padding: "0px 20px",
        background: back,
      },
      activeLink: {
        fontWeight: "bold",
        color: themeColors.dark_blue,
      },
      toggle: {
        base: {
          position: "relative",
          display: "inline-block",
          verticalAlign: "center",
          marginLeft: "-5px",
          padding: "54px 27px 0 0",
        },
        wrapper: {
          position: "absolute",
          top: "50%",
          left: "50%",
          margin: "-7px 0 0 -10px",
          height: "20px",
          color: themeColors.dark_blue,
        },
        height: 14,
        width: 14,
        arrow: {
          fill: "#9DA5AB",
          strokeWidth: 0,
        },
      },
      header: {
        base: {
          display: "inline-block",
          verticalAlign: "top",
          color: "#9DA5AB",
          padding: "0px 5px",
        },
        connector: {
          width: "2px",
          height: "12px",
          borderLeft: "solid 2px black",
          borderBottom: "solid 2px black",
          position: "absolute",
          top: "0px",
          left: "-21px",
        },
        title: {
          lineHeight: "16px",
          verticalAlign: "middle",
          display: "flex",
          textAlign: "left",
          padding: "10px 0 10px 0",
          alignItems: "center",
        },
        image: {
          width: "37px",
          height: "37px",
          objectFit: "contain",
          margin: "0 5px 0 0",
        },
        textBlock: {
          padding: "5px",
          fontSize: "14px",
          color: materialColors.blue800,
          verticalAlign: "middle",
          display: "table-cell",
        },
        active: {
          fontWeight: "bold",
          color: themeColors.dark_blue,
        },
      },
      subtree: {
        listStyle: "none",
        // paddingLeft: '19px',
        borderLeft: `1px dashed ${themeColors.menu_dashed}`,
        marginLeft: "23px",
      },
      loading: {
        color: "#E2C089",
      },
    },
  },
  menuHeader: {
    borderBottom: "1px solid rgba(34, 36, 38, 0.15)",
    height: 65,
    display: "flex",
    alignItems: "center",
    backgroundColor: back,
    justifyContent: "center",
    color: palette.primary.main,
    fontWeight: "bold",
    textAlign: "center",
    padding: "20px",
    fontSize: "20px",
    borderRadius: "3px 3px 0 0",
  },
  menuContainer: {
    width: "100%",
  },
  sidebarSection: {
    height: 80,
    padding: 20,
    borderBottom: "1px solid rgba(34, 36, 38, 0.15)",
  },
  clearSearch: {
    position: "absolute",
    right: 21,
    top: 1,
    bottom: 21,
    width: 40,
    padding: 0,
    background: "#fff",
    border: "none",
    borderRadius: 3,
  },
  hideMenuButton: {
    background: palette.filtersButton.background,
  },
  hideMenuButtonText: {
    textTransform: "uppercase",
    marginBottom: 15,
    whiteSpace: "nowrap",
    transform: "rotate(-90deg)",
  },
};

export default styles;
