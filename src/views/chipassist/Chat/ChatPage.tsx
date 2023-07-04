import React from "react";
import { Box, Hidden } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import clsx from "clsx";
import SupplierSelect from "@src/views/supplier-response/Requests/SupplierSelect/SupplierSelect";
import { useStyles as useRequestsStyles } from "@src/views/supplier-response/Requests/supplierResponseStyles";
import { onChangePartner } from "@src/store/profile/profileActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import Chat from "./Chat";
import Page from "../../../components/Page";
import { useStyles } from "./styles";

const ChatPage: React.FC = () => {
  const classes = useStyles();
  const requestsClasses = useRequestsStyles();
  const dispatch = useAppDispatch();
  const isResponses = constants.id === ID_SUPPLIER_RESPONSE;

  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);

  const onChangePartnerHandler = (id: number) => {
    const partner = partners?.find((p) => p.id === id);
    if (partner) {
      dispatch(onChangePartner(partner));
    }
  };

  return (
    <Page
      title={"Messages"}
      description={"Messages between buyers and sellers"}
      className={clsx(classes.page, { [classes.chipassistPage]: !isResponses })}
    >
      <section className={classes.section}>
        <Box display="flex" flexDirection="column" className={classes.header}>
          <Hidden smDown>
            <h1 className={requestsClasses.title}>Message center</h1>
          </Hidden>
          {partners?.length > 1 && selectedPartner && (
            <SupplierSelect
              selectedPartner={selectedPartner}
              partners={partners}
              onChangePartner={onChangePartnerHandler}
            />
          )}
        </Box>

        <Chat />
      </section>
    </Page>
  );
};

export default ChatPage;
