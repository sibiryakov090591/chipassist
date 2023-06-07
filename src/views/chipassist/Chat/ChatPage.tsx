import React from "react";
import { Box, Container } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import clsx from "clsx";
import SupplierSelect from "@src/views/supplier-response/Requests/SupplierSelect/SupplierSelect";
import { useStyles as useRequestsStyles } from "@src/views/supplier-response/Requests/supplierResponseStyles";
import { onChangePartner } from "@src/store/profile/profileActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Chat from "./Chat";
import Page from "../../../components/Page";
import { useStyles } from "./styles";

const ChatPage: React.FC = () => {
  const classes = useStyles();
  const requestsClasses = useRequestsStyles();
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
    <Page title={"Chat"} description={"Chat with buyers"}>
      <section className={classes.section}>
        <Container maxWidth="xl">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <h1 className={requestsClasses.title}>Statistic of your responses</h1>
            {selectedPartner && (
              <div className={clsx(requestsClasses.supplier, { flexible: partners?.length > 1 })}>
                You are logged in as{" "}
                {partners?.length > 1 ? (
                  <SupplierSelect
                    selectedPartner={selectedPartner}
                    partners={partners}
                    onChangePartner={onChangePartnerHandler}
                  />
                ) : (
                  <strong>{selectedPartner.name}</strong>
                )}{" "}
                supplier
              </div>
            )}
          </Box>

          <Chat />
        </Container>
      </section>
    </Page>
  );
};

export default ChatPage;
