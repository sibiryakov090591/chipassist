import React, { useState } from "react";
import ChatList from "@src/views/chipassist/Chat/components/ChatList/ChatList";
import ChatWindow from "@src/views/chipassist/Chat/components/ChatWindow/ChatWindow";
import ChatDetails from "@src/views/chipassist/Chat/components/ChatDetails/ChatDetails";
import { useStyles } from "./styles";

const Chat: React.FC = () => {
  const classes = useStyles();

  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const onShowDetailsHandler = () => {
    setShowDetails((prev) => !prev);
  };

  const onShowListHandler = (open: boolean) => {
    setShowList(open);
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
