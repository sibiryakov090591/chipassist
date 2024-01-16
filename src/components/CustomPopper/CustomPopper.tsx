import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "@src/components/CustomPopper/styles";
import useAppSelector from "@src/hooks/useAppSelector";
import { clsx } from "clsx";
import { Paper } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

interface Props {
  productId: number;
}

export const CustomPopper: React.FC<Props> = ({ productId }) => {
  const classes = useStyles();
  const { t } = useI18n("distributor.popper");
  const { intoViewportProductId, isShow } = useAppSelector((state) => state.products.requestHint);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("product_request_hint_disabled") && isShow && intoViewportProductId) {
      setOpen(intoViewportProductId === productId);
    } else if (open) {
      setOpen(false);
    }
  }, [isShow]);

  const handleClosePopper = () => {
    localStorage.setItem("product_request_hint_disabled", "true");
    setOpen(false);
  };

  return (
    <Paper elevation={3} className={clsx(classes.wrapper, { [classes.active]: open })}>
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
        <span>{t("title")}</span>
        <CloseIcon className={classes.closeIcon} onClick={handleClosePopper} />
      </div>
      <p>{t("description")}</p>
    </Paper>
  );
};

export default CustomPopper;
