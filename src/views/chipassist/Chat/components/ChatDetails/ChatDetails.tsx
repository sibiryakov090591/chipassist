import React from "react";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import Status from "@src/views/chipassist/Chat/components/Status/Status";
import { formatMoney } from "@src/utils/formatters";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

interface Props {
  showDetails: boolean;
  onCloseDetails: () => void;
}

const ChatDetails: React.FC<Props> = ({ onCloseDetails, showDetails }) => {
  const classes = useStyles();

  const { selectedChat: details } = useAppSelector((state) => state.chat);

  return (
    <div className={clsx(classes.rightColumn, { active: showDetails })}>
      <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
        <h2>Details</h2>
        <CloseIcon className={classes.closeIcon} onClick={onCloseDetails} />
      </Box>

      <div className={classes.details}>
        <div className={classes.requestCard}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <h3 className={classes.requestTitle}>Status</h3>
            <Status status={details ? "Requested" : "Closed"} />
          </Box>
          <Box display="flex" justifyContent="space-between" className={classes.requestData}>
            <div>
              <h5>Quantity</h5>
              <div>{details?.rfq ? formatMoney(details.rfq.quantity, 0) : "-"}</div>
            </div>
            <div>
              <h5>Target price</h5>
              <div>{details?.rfq && details.rfq.price ? `${formatMoney(details.rfq.price)} €` : "-"}</div>
            </div>
            <div>
              <h5>Total</h5>
              <div>
                {details?.rfq && details.rfq.price ? `${formatMoney(details.rfq.quantity * details.rfq.price)} €` : "-"}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
