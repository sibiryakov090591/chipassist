import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  productCard: {
    width: "100%",
    "&+&": {
      marginTop: "2em",
    },
  },
  productCardElfaro: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: 21,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 0,
    },
  },
  imageColumn: {
    marginRight: "18px",
    height: 75,
    [theme.breakpoints.down("xs")]: {
      marginBottom: "12px",
    },
  },
  titleColumn: {
    width: "100%",
    wordBreak: "break-word",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "12px",
    },
  },
  title: {
    display: "inline-block",
    color: "#263238",
    fontWeight: "500",
    padding: "4px 0",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  titlePartNumber: {
    fontWeight: 700,
    fontSize: "1.8rem",
    lineHeight: "26px",
  },
  manufacturerName: {
    fontSize: "16px",
  },
  actionRow: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    "& > button": {
      width: "100%",
    },
  },
  mobileActions: {
    padding: "10px 12px 6px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      width: "100%",
      maxWidth: 250,
      [theme.breakpoints.down("xs")]: {
        maxWidth: "none",
      },
    },
  },
  iconsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down(565)]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },

  iconsNoMoqContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down(565)]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  iconWrapper: {
    justifyContent: "center",
    margin: "20px 14px",
    textAlign: "center",
    [theme.breakpoints.up(565)]: {
      "&:last-child .product-card-icon-wrapper": {
        height: 18,
        margin: "11px 0",
        [theme.breakpoints.down("sm")]: {
          height: 20,
          margin: "5px 0",
        },
      },
    },
    "& .product-card-icon-wrapper": {
      height: 40,
      [theme.breakpoints.down("sm")]: {
        height: 30,
      },
    },
    "& img": {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    [theme.breakpoints.down(565)]: {
      margin: "20px 2px",
    },
  },

  iconNoMoqWrapper: {
    justifyContent: "center",
    margin: "20px 14px",
    textAlign: "center",
    "& .product-card-icon-wrapper": {
      height: 40,
      [theme.breakpoints.down("sm")]: {
        height: 30,
      },
    },
    "& img": {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    [theme.breakpoints.down(565)]: {
      margin: "20px 2px",
    },
  },
  iconValueWrapper: {
    marginLeft: 12,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginTop: 4,
    },
  },
  iconValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
      marginBottom: 0,
    },
  },
  availableItemsHint: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
    padding: 7,
    backgroundColor: theme.palette.app.blue800,
    color: "#ffffff",
  },
  total: {
    whiteSpace: "nowrap",
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 15px",
    marginTop: 20,
    background: "#ECEFF1",
    borderRadius: 5,
  },
  price: {
    display: "flex",
    width: "100px",
    padding: "7px 5px",
    height: "30px",
  },
  addButton: {
    whiteSpace: "nowrap",
    fontWeight: "bold",
    marginLeft: 20,
    height: 38,
    color: theme.palette.app.blue800,
    backgroundColor: theme.palette.white,
    transition: "all 0.2s ease",
    "&.Mui-disabled": {
      color: theme.palette.app.grey300,
      backgroundColor: theme.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: theme.palette.app.blue800,
      color: theme.palette.white,
    },
    "&:active": {
      backgroundColor: theme.palette.app.blue800,
      color: theme.palette.white,
    },
    "&:focus": {
      backgroundColor: theme.palette.app.blue800,
      color: theme.palette.white,
    },
  },
  requestButtonWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
  },
  requestButton: {
    whiteSpace: "nowrap",
    fontWeight: "bold",
    height: 38,
    minWidth: "200px",
  },
  requestButtonHelpText: {
    maxWidth: 203,
    textAlign: "center",
    paddingTop: 5,
    color: "#456",
    fontSize: "0.95rem",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none",
    },
  },
  helpIcon: {
    marginLeft: "5px",
    fontSize: 14,
  },
  datasheetImage: {
    height: "17px",
  },
  datasheetSpan: {
    marginLeft: "7px",
  },
  datasheetCount: {
    padding: "7px 5px",
    height: "30px",
    "&:hover": {
      cursor: "pointer",
      background: "#f2f2f2",
    },
  },
  rfqHint: {
    backgroundColor: "#fafafa",
    textAlign: "center",
    paddingBottom: 10,
  },
  addToCart: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    whiteSpace: "nowrap",
    height: 38,
    color: "#1b93c2",
    backgroundColor: "#ffffff",
    border: "1px solid #1b93c2",
    "&:hover": {
      backgroundColor: "#ACD4EF",
    },
  },
  inCart: {
    color: "#1b93c2",
    backgroundColor: "#ffffff",
    border: "1px solid #1b93c2",
    "&:hover": {
      backgroundColor: "#1b93c2",
      color: "#ffffff",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
  inCartMobile: {
    backgroundColor: "#1b93c2",
    color: "#ffffff",
  },
  listIconWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listIcon: {
    height: 26,
    filter: "invert(42%) sepia(96%) saturate(453%) hue-rotate(151deg) brightness(96%) contrast(86%)",
  },
  listIconCount: {
    fontSize: 16,
  },
  listIconPcs: {
    paddingTop: 4,
    paddingLeft: 3,
    fontSize: 11,
  },
  addToCartElfaro: {
    backgroundColor: "#1c8cbe",
    "&:hover": {
      backgroundColor: "#3a98cf",
    },
  },
  addedToCart: {
    backgroundColor: theme.palette.app.blue800,
    color: "#ffffff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(22, 190, 159, 0.2)",
    },
    "&:active": {
      backgroundColor: "rgba(22, 190, 159, 0.2)",
    },
    "&:focus": {
      backgroundColor: "rgba(22, 190, 159, 0.2)",
    },
  },
  cadModels: {
    display: "flex",
    fontSize: "14px",
    color: theme.palette.primary.main,
    fontWeight: 400,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
    padding: "7px 14px",
    float: "right",
  },
  cadModelsSpan: {
    padding: "2px 0px 0 7px",
  },
  cadModelsIcon: {
    color: "#fc98a6",
    fontSize: "14px",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "flex-start",
  },
  rightColumn: {
    display: "flex",
  },
  link: {
    fontSize: "12px",
    padding: "14px 12px 0 12px",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  image: {
    height: "100%",
  },
  qty: {
    "& .MuiInputBase-root": {
      "& input": {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "2px",
        textAlign: "right",
      },
    },
  },
  description: {
    fontSize: "0.9rem",
  },
  textStock: {
    color: "#666",
    fontSize: "0.9rem",
    paddingTop: "4px",
    fontWeight: "bold",
    "& span": {
      color: theme.palette.primary.main,
    },
  },
  quickOrderButton: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 5,
    "& > button": {
      whiteSpace: "nowrap",
      textTransform: "inherit",
      width: 120,
    },
  },
}));

export default "styles";
