import React from "react";
import { Paper, Tabs, Tab, Container, Box } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import FileCopy from "@material-ui/icons/FileCopy";
import { useNavigate } from "react-router-dom";
import SupplierSelect from "@src/components/SupplierSelect/SupplierSelect";
import { useStyles as useRequestsStyles } from "@src/views/supplier-response/Requests/supplierResponseStyles";
import AdapterUpload from "./AdapterUpload/AdapterUpload";
import { useStyles } from "./adapterStyles";
import AdapterList from "./AdapterList/AdapterList";
import Page from "../../../components/Page";

const Adapter: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const requestsClasses = useRequestsStyles();

  const tab = window.location.pathname;

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    return navigate(newValue);
  };

  return (
    <Page title={"Statistic"} description={"Statistics of supplier responses"}>
      <Container maxWidth="xl">
        <div className={requestsClasses.main}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <h1 className={requestsClasses.title}>Data file upload</h1>
            <SupplierSelect />
          </Box>
          <Paper square>
            <Tabs className={classes.tabs} value={tab} onChange={onChangeTab}>
              <Tab className={classes.tab} icon={<FileCopy />} label="Upload" value="/adapter/upload" />
              <Tab className={classes.tab} icon={<ListIcon />} label="Files list" value="/adapter/list" />
            </Tabs>
          </Paper>
          <Paper square>
            {tab === "/adapter/upload" && <AdapterUpload />}
            {tab === "/adapter/list" && <AdapterList />}
          </Paper>
        </div>
      </Container>
    </Page>
  );
};

export default Adapter;
