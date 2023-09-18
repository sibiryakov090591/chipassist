import React from "react";
import { Box, Button, Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import CustomPopper from "@src/components/CustomPopper/CustomPopper";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { Product } from "@src/store/products/productTypes";
import { rfqModalOpen } from "@src/store/rfq/rfqActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppTheme from "@src/theme/useAppTheme";
import { useInView } from "react-intersection-observer";
import { SetProductIntoViewport } from "@src/store/products/productsActions";

interface Props {
  requestedQty?: number;
  product: Product;
  classes: any;
}

const RequestButton: React.FC<Props> = ({ requestedQty, product, classes }) => {
  const commonClasses = useCommonStyles();

  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const { isShow } = useAppSelector((state) => state.products.requestHint);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { ref } = useInView({
    threshold: 0,
    skip: isSmDown || isShow,
    onChange: (inView) => {
      if (!sessionStorage.getItem("product_rfq_hint_disabled") && inView) {
        dispatch(SetProductIntoViewport(product.id));
      }
    },
  });

  const sendRfqOpenModal = () => {
    dispatch(rfqModalOpen(product.upc, 1, null, null, null, null, "rfq", product.id));
  };

  return (
    <div className={classes.requestButtonWrapper} ref={ref}>
      {isAuthenticated && !!requestedQty ? (
        <Tooltip
          disableFocusListener={isDownMd}
          disableHoverListener={isDownMd}
          disableTouchListener={isDownMd}
          classes={{ tooltip: commonClasses.tooltip }}
          title={
            <div>
              {`You have already requested`} <strong>{`${requestedQty}pcs`} </strong> {`of`}{" "}
              <strong>{product.upc}</strong>
            </div>
          }
        >
          <Button
            variant="contained"
            className={clsx("tutorial-create-rfq", appTheme.buttonCreate, classes.requestButton)}
            onClick={sendRfqOpenModal}
          >
            <Box display="flex" alignItems={"center"}>
              Requested
              {!isDownMd && <HelpOutlineOutlinedIcon className={classes.helpIcon} />}
            </Box>
          </Button>
        </Tooltip>
      ) : (
        <>
          <Button
            aria-describedby={"popper"}
            variant="contained"
            className={clsx("tutorial-create-rfq", appTheme.buttonCreate, classes.requestButton)}
            onClick={sendRfqOpenModal}
          >
            {"Get more quotes"}
          </Button>
          <CustomPopper productId={product.id} />
        </>
      )}
      {isDownMd && !!requestedQty && isAuthenticated && (
        <div className={classes.requestButtonHelpText}>
          {`You have already requested`} <strong>{`${requestedQty}pcs`} </strong> {`of`} <strong>{product.upc}</strong>
        </div>
      )}
      {((isDownMd && !requestedQty) || !isDownMd) && (
        <div className={classes.requestButtonHelpText}>Get additional quotes from connected sellers</div>
      )}
    </div>
  );
};

export default RequestButton;
