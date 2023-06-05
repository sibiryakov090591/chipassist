import React, { useState, useEffect } from "react";
// import Alert from "@material-ui/lab/Alert";
// import { Button } from "@material-ui/core";
import { Stockrecord, STOCKRECORD_ERROR_PRICE } from "@src/store/products/productTypes";
import constants from "@src/constants/constants";
// import { useI18n } from "@src/services/I18nProvider/I18nProvider";
// import { useStyles } from "../cartItemStyles";
// import { useStyles as useCartStyles } from "../../../../cartStyles";

interface Props {
  stockrecord: Stockrecord;
  quantity: number;
  rfq: number;
  dateUpdated: string;
  isUpdating: boolean;
  isAuthenticated: boolean;
  onUpdatePriceClick: () => void;
  onUpdateProductClick: () => void;
  onMoveToRfqClick: () => void;
  onMoveToOrderClick: () => void;
  showUpdateButton: boolean;
}
const ItemErrors: React.FC<Props> = ({
  stockrecord,
  rfq,
  dateUpdated,
  // isAuthenticated,
  // onUpdatePriceClick,
  onUpdateProductClick,
  onMoveToRfqClick,
  // showUpdateButton,
}) => {
  const [onceUpdated, setOnceUpdated] = useState(false);
  // const classes = useStyles();
  // const classesCart = useCartStyles();
  // const { t } = useI18n("cart");
  const validUpdateTime = (constants.CART_ITEM_PERIOD_OF_RELEVANCE || 24) * 60 * 60 * 1000;

  useEffect(() => {
    const isErrors = stockrecord?.errors?.some((v) => v.id !== STOCKRECORD_ERROR_PRICE);

    // if product not updated & has errors - update it
    if (!onceUpdated && isErrors) {
      setOnceUpdated(true);
      if (Date.now() - Date.parse(dateUpdated) > validUpdateTime) {
        onUpdateProductClick();
      }
    }
    // if product updated & has errors - move to rfq
    if (onceUpdated && isErrors && !rfq) {
      onMoveToRfqClick();
    }
  }, [stockrecord, onceUpdated]);

  return null;

  // return (
  //   <React.Fragment>
  //     {!rfq && !!stockrecord?.errors?.filter((v) => v.id !== STOCKRECORD_ERROR_PRICE).length && (
  //       <Alert className={classes.alert} severity="error">
  //         <div className={`${classes.updatePriceText} ${classesCart.alertMessage}`}>
  //           <span>
  //             {stockrecord?.errors
  //               ?.filter((v) => parseInt(v.id) !== 6)
  //               .map((v) => v.message)
  //               .join(", ")}
  //           </span>
  //           {/* {isAuthenticated && showUpdateButton && (
  //             <Button
  //               disabled={isUpdating}
  //               variant="contained"
  //               color="secondary"
  //               size="small"
  //               className={`${classes.updatePriceBtn}`}
  //               onClick={onUpdateProductClick}
  //             >
  //               {t("common.update")}
  //             </Button>
  //           )} */}
  //         </div>
  //       </Alert>
  //     )}
  //     {isAuthenticated &&
  //       !!stockrecord?.errors?.length &&
  //       stockrecord?.errors?.some((v) => v.id === STOCKRECORD_ERROR_PRICE) && (
  //         <Alert classes={{ root: classes.alert }} severity="warning">
  //           <div className={`${classes.updatePriceText} ${classesCart.alertMessage}`}>
  //             <span>{stockrecord?.errors?.find((v) => parseInt(v.id) === 6).message}</span>
  //             <Button
  //               variant="contained"
  //               color="secondary"
  //               size="small"
  //               className={classes.updatePriceBtn}
  //               onClick={onUpdatePriceClick}
  //             >
  //               {t("common.accept")}
  //             </Button>
  //           </div>
  //         </Alert>
  //       )}
  //     {/* {!rfq && (
  //         <Button
  //           disabled={isUpdating}
  //           variant="contained"
  //           color="secondary"
  //           size="small"
  //           className={`${classes.updateBtn}`}
  //           onClick={onMoveToRfqClick}
  //         >
  //           {t("rfq_add_button")}
  //         </Button>
  //       )} */}
  //   </React.Fragment>
  // );
};

export default ItemErrors;
