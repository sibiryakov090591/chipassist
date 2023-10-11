import React from "react";
import { Button, DialogContent, DialogActions, Dialog, Box } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { EditorBomData } from "@src/store/bom/bomTypes";
// import { Product } from "@src/store/products/productTypes";
import useAppDispatch from "@src/hooks/useAppDispatch";
// import { isProductAvailable } from "@src/utils/product";
import { saveRfqListItems } from "@src/store/rfq/rfqActions";
import { updateBom, loadAllBomPagesThunk } from "@src/store/bom/bomActions";
import { showAlertsModalMessageAction } from "@src/store/alerts/alertsActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { clsx } from "clsx";
// import { useStyles } from "./checkoutModalStyles";

interface Props {
  onCloseModal: () => void;
  setIsSending?: (val: boolean) => void;
  bom: EditorBomData;
  // cost: number;
  // tax: number;
  // taxCost: number;
}

const CheckoutModal: React.FC<Props> = ({ onCloseModal, bom, setIsSending }) => {
  // const [counts, setCounts] = useState({ order: 0, rfq: 0, empty: 0 });
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const utm = useAppSelector((state) => state.common.utm);
  // const cart = useAppSelector((state: RootState) => state.cart);
  const { t } = useI18n("bom");
  // const navigate = useNavigate();
  // const classes = useStyles();
  // const { currency, currencyPrice } = useCurrency();

  // const isShowMinTax = [ID_MASTER, ID_CHIPASSIST, ID_ELFARO].includes(constants.id);

  // useEffect(() => {
  //   const res_counts = Object.values(bom.items).reduce(
  //     (acc, val) => {
  //       const stockrecord = (val.product as Product)?.stockrecords?.find((v) => v.id === val.stockrecord);
  //       if (val.approved && isProductAvailable(stockrecord, val.quantity)) {
  //         return { ...acc, order: acc.order + 1 };
  //       }
  //       if (val.approved && !isProductAvailable(stockrecord, val.quantity)) {
  //         return { ...acc, rfq: acc.rfq + 1 };
  //       }
  //
  //       return { ...acc, empty: acc.empty + 1 };
  //     },
  //     { order: 0, rfq: 0, empty: 0 },
  //   );
  //   setCounts(res_counts);
  // }, [bom.items]);

  // const checkout = () => {
  //   dispatch(prepareBomCart(cart.info.id, cart.items, bom.items)).then((isNeedToGetToCheckout: boolean) => {
  //     if (isNeedToGetToCheckout) {
  //       navigate(`/bom/${bom.id}/checkout`);
  //     } else {
  //       dispatch(updateBom(bom.id, { readonly: true })).then(() => {
  //         dispatch(loadAllBomPagesThunk(bom.id, 1, 500));
  //       });
  //       dispatch(
  //         showAlertsModalMessageAction({
  //           title: t("checkout.success_title"),
  //           description: t("checkout.success_rfq_description"),
  //           severity: "success",
  //         }),
  //       );
  //     }
  //   });
  //   dispatch(setCheckoutBom(bom));
  //   onCloseModal();
  // };

  const confirmCheckout = () => {
    const rfqsList: any = [];
    Object.values(bom.items)
      .filter((item) => item.approved)
      .forEach((item) => {
        const listItem: any = {
          part_number: item.part_number,
          quantity: item.quantity,
        };
        if (Object.keys(utm).length) {
          listItem.query = Object.entries(utm).reduce((acc, ent) => {
            return ent[1] ? `${acc && `${acc}&`}${ent[0]}=${ent[1]}` : acc;
          }, "");
        }
        rfqsList.push(listItem);
      });
    if (rfqsList.length) setIsSending(true);
    dispatch(saveRfqListItems(rfqsList, null, true))
      .then(() => {
        dispatch(
          showAlertsModalMessageAction({
            title: t("checkout.success_title"),
            description: t("checkout.success_rfq_description"),
            severity: "success",
          }),
        );
        dispatch(updateBom(bom.id, { readonly: true })).then(() => {
          dispatch(loadAllBomPagesThunk(bom.id, 1, 500));
        });
      })
      .finally(() => setIsSending(false));
    onCloseModal();
  };

  return (
    <Dialog
      open={true}
      onClose={onCloseModal}
      aria-labelledby="bom-confirm-title"
      aria-describedby="bom-confirm-description"
    >
      <Box p={2}>
        <DialogContent>
          <h3>{t("checkout.success_rfq_title")}</h3>
          <p>{t("checkout.success_rfq_description")}</p>
        </DialogContent>
        <Box pt={2}>
          <DialogActions>
            <Button
              className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
              size="small"
              onClick={onCloseModal}
              variant="contained"
            >
              {t("checkout.cancel")}
            </Button>
            <Button
              className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
              size="small"
              onClick={confirmCheckout}
              color="primary"
              variant="contained"
            >
              {t("common.confirm")}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckoutModal;
