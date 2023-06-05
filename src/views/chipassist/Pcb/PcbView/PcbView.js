import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Grid, Typography, Box, Paper, Button } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { Link as RouterLink, useParams, useNavigate, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
import { pcbModalUpdate, getPcbItem, deletePcbThunk } from "@src/store/pcb/pcbActions";
import { Page } from "@src/components";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./PcbViewStyles";
import PcbCommentModal from "../components/PcbCommentModal/PcbCommentModal";
import PcbResponsesTable from "../components/PcbResponsesTable/PcbResponsesTable";
import PcbViewData from "./components/PcbViewData";
import PreloaderState from "./components/PreloaderState";
import EmptyState from "./components/EmptyState";

function PcbView(props) {
  const [openCommentModal, setOpenCommentModal] = useState(null);
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n("pcb");
  const { pcbId } = useParams();
  const pcbItem = useAppSelector((state) => state.pcb.pcbItem);
  const pcbItemLoading = useAppSelector((state) => state.pcb.pcbItemLoading);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  useEffect(() => {
    if (dispatch) {
      dispatch(getPcbItem(pcbId));
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

  const onOpenCommentModal = (id) => {
    setOpenCommentModal(id);
  };

  const onCloseCommentModal = () => {
    setOpenCommentModal(null);
  };

  const onDeleteClick = (id) => () => {
    dispatch(deletePcbThunk(id)).then(() => {
      navigate({
        pathname: "/pcb",
        search: location.state && location.state.backQuery,
      });
    });
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
                        search: history.location.state && history.location.state.backQuery,
                      }}
                      className={classes.buttonBack}
                    >
                      {t("title")}
                    </Button>
                  </Box>
                  <Box display="flex">
                    {pcbItem.status === "CREATED" && (
                      <Button
                        className={clsx(classes.buttonAction, appTheme.buttonPrimary)}
                        variant="contained"
                        onClick={() => dispatch(pcbModalUpdate(pcbItem))}
                      >
                        {t("common.edit")}
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      className={clsx(classes.buttonAction, appTheme.buttonPrimary)}
                      onClick={() => onOpenCommentModal(pcbItem.id)}
                    >
                      {t("column.comment")}
                    </Button>

                    {!pcbItem.response_pcb.length && (
                      <ConfirmButton
                        onAction={onDeleteClick(pcbId)}
                        theme="button"
                        type="delete"
                        size="medium"
                        className={clsx(classes.buttonAction, appTheme.buttonCancel)}
                        question={t("delete_pcb")}
                        caption={t("common.delete")}
                      />
                    )}
                  </Box>
                </Box>
              </Paper>
              <Paper square p={10}>
                <Box padding={4} paddingTop={5} paddingBottom={2}>
                  <Typography variant="h4" component="h4">
                    {t("pcb")} #{pcbItem.id}
                  </Typography>
                </Box>
                <Box padding={4} pt={1}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                      <PcbViewData item={pcbItem} type="user" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" component="h5" className={classes.sectionTitle}>
                        {t("responses")}
                      </Typography>
                      <PcbResponsesTable item={pcbItem} size="small" borders={true} />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </React.Fragment>
          )}
        </Box>
      </Container>
      {!!openCommentModal && <PcbCommentModal onClose={onCloseCommentModal} pcb={pcbItem} />}
    </Page>
  );
}

export default PcbView;
