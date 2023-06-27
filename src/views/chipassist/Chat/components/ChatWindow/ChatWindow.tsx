import React from "react";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Messages from "@src/views/chipassist/Chat/components/ChatWindow/components/Messages/Messages";
import clsx from "clsx";
import useAppSelector from "@src/hooks/useAppSelector";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { useStyles } from "./styles";

interface Props {
  showList: boolean;
  showDetails: boolean;
  onShowList: (open: boolean) => void;
  onShowDetails: (open: boolean) => void;
}

const ChatWindow: React.FC<Props> = ({ showList, showDetails, onShowList, onShowDetails }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { selectedChat } = useAppSelector((state) => state.chat);

  const onShowChatListHandler = () => {
    onShowList(!showList);
  };

  const onShowDetailsHandler = () => {
    onShowDetails(!showDetails);
  };

  const name = React.useMemo(() => {
    return constants.id === ID_SUPPLIER_RESPONSE
      ? selectedChat?.partner &&
          Object.entries(selectedChat.partner).reduce((acc, item) => {
            const [key, value] = item;
            if (value) return acc ? `${acc} ${key === "company_name" ? ` (${value})` : ` ${value}`}` : value;
            return acc;
          }, "")
      : selectedChat?.partner.first_name;
  }, [selectedChat]);

  return (
    <div
      className={clsx(classes.middleColumn, {
        detailsActive: showDetails,
        chatListActive: showList,
      })}
    >
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
          <div className={classes.headerInfo}>
            {isMdDown && !showList && (
              <Box display="flex" alignItems="center" pr="16px" onClick={onShowChatListHandler}>
                <ArrowBackIosRoundedIcon />
              </Box>
            )}
            <div>
              <h2 className={classes.upc}>{selectedChat?.title || selectedChat?.rfq?.upc}</h2>
              <div className={classes.seller}>{name}</div>
            </div>
          </div>
          <MoreVertIcon
            className={clsx(classes.showDetailsIcon, { active: showDetails })}
            onClick={onShowDetailsHandler}
          />
        </Box>

        <Messages />
      </Box>
    </div>
  );
};

export default ChatWindow;
