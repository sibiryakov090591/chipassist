import React from "react";
import { Box } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import SupplierSelect from "@src/views/supplier-response/Requests/SupplierSelect/SupplierSelect";
import { onChangePartner } from "@src/store/profile/profileActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Chat from "./Chat";
import Page from "../../../components/Page";
import { useStyles } from "./styles";

const ChatPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);

  const onChangePartnerHandler = (id: number) => {
    const partner = partners?.find((p) => p.id === id);
    if (partner) {
      dispatch(onChangePartner(partner));
    }
  };

  return (
    <Page title={"Messages - ChipAssist"} description={"Messages between buyers and sellers"} className={classes.page}>
      <section className={classes.section}>
        {partners?.length > 1 && selectedPartner && (
          <Box m="0 12px">
            <SupplierSelect
              selectedPartner={selectedPartner}
              partners={partners}
              onChangePartner={onChangePartnerHandler}
            />
          </Box>
        )}

        <Chat />
      </section>
    </Page>
  );
};

export default ChatPage;
