import React from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import StatusChip from "@src/components/StatusChip/StatusChip";

const useStyles = makeStyles(() => ({
  priceTooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "inherit",
    border: "1px solid #dadde9",
    maxWidth: "none",
    padding: "10px 10px",
  },
  status: {
    cursor: "help",
    display: "inline-block",
  },
  wrapper: {
    display: "flex",
  },
}));

interface Props {
  status: "online" | "rfq";
}

const StatusTooltip: React.FC<Props> = ({ status }) => {
  const classes = useStyles();
  const { t } = useI18n("product");

  return (
    <Tooltip
      classes={{ tooltip: classes.priceTooltip }}
      title={
        <div>
          {status === "online" && (
            <div className={classes.wrapper}>
              <span style={{ marginRight: 3 }}>
                <StatusChip isRfq={false} />
              </span>{" "}
              - {t("status_online_hint")}
            </div>
          )}
          {status === "rfq" && (
            <div className={classes.wrapper}>
              <span style={{ marginRight: 3 }}>
                <StatusChip isRfq={true} />
              </span>{" "}
              - {t("status_rfq_hint")}
            </div>
          )}
        </div>
      }
    >
      <div className={classes.status}>
        {status === "online" ? <StatusChip isRfq={false} /> : <StatusChip isRfq={true} />}
      </div>
    </Tooltip>
  );
};

export default StatusTooltip;
