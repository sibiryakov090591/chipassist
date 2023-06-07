import React, { useState } from "react";
import ChatList from "@src/views/chipassist/Chat/components/ChatList/ChatList";
import ChatWindow from "@src/views/chipassist/Chat/components/ChatWindow/ChatWindow";
import ChatDetails from "@src/views/chipassist/Chat/components/ChatDetails/ChatDetails";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useStyles } from "./styles";

const Chat: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const betweenSmMd = useMediaQuery(theme.breakpoints.between(800, "md"));

  const [showList, setShowList] = useState(!isSmDown);
  const [showDetails, setShowDetails] = useState(false);

  const onShowDetailsHandler = () => {
    setShowDetails(!showDetails);
    if (betweenSmMd) setShowList(showDetails);
  };

  const onShowListHandler = (open: boolean) => {
    setShowList(open);
    if (betweenSmMd) setShowDetails(!open);
  };

  return (
    <div className={classes.container}>
      <ChatList onShowList={onShowListHandler} showList={showList} />
      <ChatWindow
        onShowList={onShowListHandler}
        showList={showList}
        onShowDetails={onShowDetailsHandler}
        showDetails={showDetails}
      />
      <ChatDetails onCloseDetails={onShowDetailsHandler} showDetails={showDetails} />
    </div>
  );
};

export default Chat;