import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

export const selectStyles = {
  control: () => ({
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    width: "max-content",
  }),
};

export const useStyles = makeStyles((theme: Theme & AppTheme) =>
  createStyles({
    rowDisabled: {
      backgroundColor: "#fafafa",
    },
    contentDisabled: {
      filter: "blur(1px)",
      opacity: 0.35,
      pointerEvents: "none",
      touchAction: "none",
    },
    rowUpdating: {
      opacity: "1",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    main: {
      width: "100%",
      border: "2px solid #ececec",
      marginBottom: "1em",
    },
    container: {
      display: "flex",
    },
    productAreas: {
      display: "grid",
      gridTemplateColumns: "80px 1fr",
      gridTemplateAreas: `
        "product-image product-description"
        "product-image product-errors"
      `,
    },
    bordered: {
      "& >*": {
        [theme.breakpoints.up("md")]: {
          borderTop: `1px solid ${theme.palette.app.grey200}`,
        },
      },
    },
    imageColumn: {
      gridArea: "product-image",
      padding: "10px",
    },
    imageColumnVer2: {
      display: "block",
      marginRight: 16,
      padding: "10px",
    },
    descriptionColumn: {
      gridArea: "product-description",
      margin: "0 0 0 1em",
    },
    errorsColumn: {
      gridArea: "product-errors",
    },
    name: {
      color: theme.palette.black,
      display: "block",
      marginBottom: 5,
    },
    nameVer2: {
      color: "#345",
      display: "block",
      marginBottom: 5,
      fontSize: 18,
      fontWeight: "bold",
    },
    img: {
      width: "auto",
      height: "auto",
      maxHeight: "50px",
      objectFit: "cover",
    },
    manufacture: {
      fontWeight: 400,
      lineHeight: 1.75,
    },
    description: {
      marginBottom: "0.8em",
      fontSize: "0.8em",
      lineHeight: "1.6",
      textRendering: "optimizeLegibility",
    },
    productErrorButtons: {
      display: "flex",
    },
    links: {
      width: "571px",
    },
    link: {
      color: theme.palette.primary.main,
      fontSize: "0.9em",
      textDecoration: "underline",
    },
    total: {
      width: "50%",
    },
    totalLabel: {
      width: "50%",
    },
    totalRow: {
      display: "flex",
      padding: "0 0 19px 0",
    },
    perItem: {
      width: "50%",
    },
    perItemLabel: {
      width: "50%",
    },
    perItemRow: {
      display: "flex",
      padding: "0 0 19px 0",
    },
    quantity: {
      width: "50%",
    },
    quantityLabel: {
      width: "50%",
    },
    quantityRow: {
      display: "flex",
      padding: "0 0 19px 0",
    },
    counters: {
      width: "100%",
      fontSize: "12.8px",
      fontWeight: 400,
      lineHeight: "10px",
      marginTop: "19px",
    },
    countersColumn: {
      width: "100%",
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: "#fefefe",
      borderColor: theme.palette.primary.main,
      fontWeight: 400,
      fontSize: "1rem",
      width: "107px",
      padding: "10px",
      textAlign: "center",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
    },
    input: {
      borderColor: theme.palette.primary.main,
      textAlign: "center",
      boxSizing: "border-box",
      padding: "10px",
      fontSize: "1rem",
      fontWeight: 400,
      transition: "box-shadow .5s,border-color .25s ease-in-out",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
    },
    form: {},
    formBlock: {},
    remove: {
      color: theme.palette.app.red400,
      "&:hover": {
        color: theme.palette.app.red500,
      },
      width: 28,
      height: 28,
      cursor: "pointer",
      transition: "all 0.2s",
    },
    qty: {
      width: "9ch",
      "& .MuiFormHelperText-contained": { marginLeft: 0, marginRight: 0, textAlign: "center" },
      [theme.breakpoints.down("sm")]: {
        // marginTop: "-6px",
        "& .MuiInputBase-input": {
          padding: "7px 4px",
        },
      },
    },
    distributor: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      paddingBottom: "1px",
      "&:hover": {
        borderBottom: "1px solid",
        paddingBottom: "0px",
      },
      "& i": { marginLeft: 7 },
    },
    distributorUpdated: {
      marginTop: "2px",
      fontSize: "11px",
      lineHeight: "1.1em",
      "& > div:first-of-type": {
        fontSize: "0.9em",
      },
    },
    buttonArrow: {
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "6px 4px 0 4px",
      borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
    },
    price: {
      fontWeight: "bold",
      color: "#345",
      fontSize: 16,
      "& > span": {
        whiteSpace: "nowrap",
      },
      [theme.breakpoints.down("xs")]: {
        fontWeight: "normal",
      },
    },
    priceMobile: {
      display: "flex",
      justifyContent: "center",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "flex-start",
      },
    },
    rfqPrice: {
      color: "#2292a4",
      fontSize: "0.9rem",
      fontWeight: 600,
      whiteSpace: "nowrap",
    },
    priceTooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: "inherit",
      border: "1px solid #dadde9",
      maxWidth: "none",
    },
    priceTooltipTable: {
      "& th": { fontSize: "0.9em", textAlign: "right", padding: "2px 5px" },
      "& td": { fontSize: "0.9em", textAlign: "right", padding: "2px 5px" },
    },
    priceTooltipIcon: {
      color: "#2292a4",
    },
    error: {
      color: theme.palette.app.red500,
      fontSize: "11px",
      letterSpacing: "0.33px",
    },
    alert: {
      // marginTop: "10px",
      display: "flex",
      alignItems: "center",
      "&.valid": {
        borderRadius: "5px 0 0 5px",
        marginBottom: 10,
        borderTop: "none",
        height: "100%",
      },
    },
    alertValidRow: {
      marginBottom: 10,
      backgroundColor: "rgb(232, 241, 250)",
      "&:last-of-type": {
        borderRadius: "0 5px 5px 0",
      },
    },
    updateBtn: {
      display: "block",
      marginTop: "5px",
      whiteSpace: "nowrap",
      "& + &": { marginLeft: 10 },
    },
    updatePriceBtn: {
      marginLeft: "15px",
      textTransform: "none",
      padding: "2px 6px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    updatePriceText: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
      },
    },
    alertValid: {
      display: "flex",
      flexDirection: "row !important" as "column",
      alignItems: "center",
    },
    validBtn: { marginLeft: 20, padding: "5px 8px" },
    columnActions: {
      padding: 5,
      [theme.breakpoints.down("sm")]: { textAlign: "center" },
    },
    qtyColumn: {
      position: "relative",
      // width: "min-content",
    },
    errorMessage: {
      position: "absolute",
      bottom: "-18px",
      left: "50%",
      transform: "translateX(-50%)",
      whiteSpace: "nowrap",
      fontSize: 10,
      color: theme.palette.app.red500,
    },
    manufactureVer2: {
      color: "#345",
      fontWeight: "bold",
      [theme.breakpoints.down("xs")]: {
        fontWeight: "normal",
      },
    },
    alignCenter: {
      [theme.breakpoints.up("sm")]: {
        textAlign: "center",
      },
    },
    label: {
      whiteSpace: "nowrap",
    },
    removeButtonWrapper: {
      padding: 13,
    },
    removeButton: {
      fontSize: 13,
      fontWeight: "bold",
      minWidth: 200,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    helpIcon: {
      cursor: "help",
      marginLeft: 3,
      color: "#1b93c2",
      fontSize: 22,
    },
  }),
);

export default "styles";
