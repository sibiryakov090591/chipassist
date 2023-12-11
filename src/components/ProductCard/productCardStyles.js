import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  productCard: {
    width: "100%",
    // padding: "21px 0 16px 0",
    [theme.breakpoints.down("sm")]: {
      // padding: "10px 0 0px 0",
    },
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
    padding: "0 21px 21px",
  },
  imageColumn: {
    marginRight: "12px",
    height: 75,
  },
  titleColumn: {
    width: "100%",
    paddingRight: 20,
  },
  title: {
    display: "inline-block",
    color: theme.palette.primary.main,
    fontWeight: "500",
    padding: "4px 0",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  titlePartNumber: {
    fontWeight: 700,
  },
  actionRow: {
    display: "flex",
    justifyContent: "end",
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
    display: "flex",
    whiteSpace: "nowrap",
    alignItems: "center",
    textTransform: "none",
    transition: "all 0.2s ease",
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
  addToCart: {
    marginLeft: 20,
    whiteSpace: "nowrap",
    textTransform: "none",
  },
  addToCartElfaro: {
    backgroundColor: "#1c8cbe",
    "&:hover": {
      backgroundColor: "#3a98cf",
    },
  },
  addedToCart: {
    border: "1px solid rgba(22, 190, 159, 0.8)",
    backgroundColor: "rgba(22, 190, 159, 0.1)",
    color: "rgba(22, 190, 159, 1)",
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
    marginTop: 5,
    "& > button": {
      whiteSpace: "nowrap",
      textTransform: "inherit",
      width: 120,
    },
  },
  elfaroActions: {
    display: "flex",
    height: "max-content",
  },
}));

export default "styles";
