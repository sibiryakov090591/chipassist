import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Grid, Typography, Box, Paper, Button } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { Link as RouterLink, useParams, useNavigate, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { getPcbPartnerItem, clearPcbResponse, exportPcbThunk } from "@src/store/pcb/pcbActions";
import { Page } from "@src/components";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./PcbViewStyles";
import PcbMakeResponse from "../components/PcbMakeResponse/PcbMakeResponse";
import PcbMakeResponseTable from "../components/PcbMakeResponseTable/PcbMakeResponseTable";
import PcbViewData from "./components/PcbViewData";
import PreloaderState from "./components/PreloaderState";
import EmptyState from "./components/EmptyState";

function PcbView() {
  const [makeResponse, setMakeResponse] = useState(null);
  const [isEditInstance, setIsEditInstance] = useState(null);
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n("pcb");
  const { pcbId } = useParams();
  const pcbItem = useAppSelector((state) => state.pcb.pcbItem);
  const pcbItemLoading = useAppSelector((state) => state.pcb.pcbItemLoading);
  const profile = useAppSelector((state) => state.profile.profileInfo);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const haveCreatedAnswer =
    pcbItem.response_pcb && pcbItem.response_pcb.length && pcbItem.response_pcb[0].status === "CREATED";

  useEffect(() => {
    if (dispatch) {
      dispatch(getPcbPartnerItem(pcbId));
    }
  }, [dispatch, shouldUpdateBackend]);

  const escHandler = (event) => {
    if (event.keyCode === 27) {
      navigate({
        pathname: "/pcb",
        search: location.state && location.state.backQuery,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);

    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [escHandler]);

  const onEdit = () => {
    setMakeResponse(true);
    setIsEditInstance(true);
  };

  const onOpenMakeResponse = (id) => {
    setMakeResponse(id);
  };

  const onCloseMakeResponse = () => {
    setMakeResponse(null);
    setIsEditInstance(false);
    dispatch(clearPcbResponse());
  };

  const onExportPCB = (id, etype) => {
    dispatch(exportPcbThunk(id, etype));
  };

  return (
    <Page title={`${t("pcb_view")} #${pcbId}`} description={t("pcb_view")}>
      <Container maxWidth="xl">
        <Box mt={5} mb={5} className={classes.background}>
          {!pcbItem.id && !pcbItemLoading && <EmptyState />}
          {pcbItemLoading && <PreloaderState />}
          {pcbItem.id && !pcbItemLoading && (
            <React.Fragment>
              <Paper square>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex">
                    <Button
                      startIcon={<ListIcon />}
                      component={RouterLink}
                      to={{
                        pathname: "/pcb",
                        search: location.state && location.state.backQuery,
                      }}
                      className={classes.buttonBack}
                    >
                      {t("title")}
                    </Button>
                  </Box>
                  <Box display="flex">
                    <Button
                      variant="contained"
                      className={clsx(classes.buttonAction, appTheme.buttonPrimary)}
                      onClick={() => onExportPCB(pcbItem.id, "csv")}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="contained"
                      className={clsx(classes.buttonAction, appTheme.buttonPrimary)}
                      onClick={() => onExportPCB(pcbItem.id, "xls")}
                    >
                      Excel
                    </Button>

                    {pcbItem.status !== "DONE" && !haveCreatedAnswer && (
                      <Button
                        variant="contained"
                        color="primary"
                        className={clsx(classes.buttonAction, appTheme.buttonCreate)}
                        onClick={() => onOpenMakeResponse(pcbItem.id)}
                      >
                        {t("response")}
                      </Button>
                    )}
                  </Box>
                </Box>
              </Paper>
              <Paper square p={10}>
                <Box padding={4} paddingTop={5} paddingBottom={2}>
                  <Typography variant="h4" component="h4">
                    {t("partner_pcb")} #{pcbItem.id}
                  </Typography>
                </Box>
                <Box padding={4} pt={1}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                      <PcbViewData item={pcbItem} type="partner" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" component="h5" className={classes.sectionTitle}>
                        {t("response_my")}
                      </Typography>
                      <PcbMakeResponseTable item={pcbItem} borders={true} onEdit={onEdit} />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </React.Fragment>
          )}
        </Box>
      </Container>
      {!!makeResponse && (
        <PcbMakeResponse
          onClose={onCloseMakeResponse}
          onDeletePcbFromStore={false}
          pcb={pcbItem}
          profile={profile}
          isEditInstance={isEditInstance}
        />
      )}
    </Page>
  );
}

export default PcbView;
