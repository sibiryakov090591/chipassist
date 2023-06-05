import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./statusChipStyles";

interface Props {
  isRfq: boolean;
}

const StatusChip: React.FC<Props> = ({ isRfq }) => {
  const classes = useStyles();
  const { t } = useI18n("distributor");
  return (
    <div className={`${classes.chip} ${!isRfq ? "online" : "rfq"}`}>
      {!isRfq ? t("product.status_online") : t("price_by_request")}
    </div>
  );
};
export default StatusChip;
