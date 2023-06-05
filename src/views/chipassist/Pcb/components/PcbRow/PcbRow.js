import React, { useState } from "react";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { TableRow, TableCell, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
import { pcbModalUpdate, deletePcbThunk, exportPcbThunk } from "@src/store/pcb/pcbActions";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";
import { PCB_TYPE_PARTNERS } from "../../Pcb";
import PcbRowFields from "./PcbRowFields";
import MoreButton from "../MoreButton/MoreButton";

const PcbRow = (props) => {
  const { pcb, columns, hiddenColumns, pcbType, onOpenResponses, onMakeResponse, onCommentClick, isPartner } = props;
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const [willDelete, setWillDelete] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n("pcb");

  const hasResponse =
    isPartner &&
    pcb.response_pcb &&
    pcb.response_pcb.length &&
    pcbType === PCB_TYPE_PARTNERS &&
    pcb.response_pcb[0].status;

  const responseStatus = hasResponse ? (
    <div>
      {t("show_response")}
      <div>
        <Button component="a" variant="outlined" color="primary" size="small" style={{ cursor: "inherit" }}>
          {pcb.response_pcb[0].status}
        </Button>
      </div>
    </div>
  ) : (
    ""
  );

  const rowClass = clsx({
    [classes.disabledRow]: hasResponse && hasResponse !== "CREATED",
  });

  const onDeleteClick = (id) => () => {
    dispatch(deletePcbThunk(id));
  };

  const onDeleteSubmitOpen = (key) => () => {
    setWillDelete(key);
  };

  const onDeleteSubmitClose = () => {
    setWillDelete(null);
  };

  const isResponse = (item) => {
    return item.response_pcb && !!item.response_pcb.length;
  };

  const onExportPCB = (id, etype) => () => {
    dispatch(exportPcbThunk(id, etype));
  };

  return (
    <TableRow
      className={clsx({
        [rowClass]: true,
        [classes.statusCreated]: pcb.status === "CREATED",
        [classes.statusDone]: pcb.status === "DONE",
        [classes.removeLine]: pcb.id === willDelete,
      })}
    >
      <PcbRowFields {...{ columns, hiddenColumns, pcb, pcbType, onCommentClick }} />

      <TableCell name="actions" align="right">
        <Box display="flex" alignItems="center" justifyContent="flex-end" className="pcb-row-response">
          {pcbType === PCB_TYPE_PARTNERS ? (
            pcb.status !== "DONE" && (
              <React.Fragment>
                <Button
                  variant={hasResponse ? "outlined" : "contained"}
                  color={hasResponse ? "default" : "primary"}
                  size="small"
                  onClick={onMakeResponse}
                  className={clsx(
                    classes.responseBtn,
                    hasResponse && appTheme.buttonCreate,
                    !hasResponse && appTheme.buttonPrimary,
                  )}
                >
                  {hasResponse ? responseStatus : t("response")}
                </Button>
              </React.Fragment>
            )
          ) : (
            <React.Fragment>
              {isResponse(pcb) && (
                <Button
                  className={clsx(classes.pcbActionButton, appTheme.buttonPrimary)}
                  variant="contained"
                  size="small"
                  onClick={onOpenResponses}
                >
                  {t("responses")}
                  <span className={classes.counter}>{pcb.response_pcb.length}</span>
                </Button>
              )}
            </React.Fragment>
          )}
          {pcbType === PCB_TYPE_PARTNERS && (
            <Button
              className={clsx(classes.pcbActionButton, appTheme.buttonCreate)}
              variant="contained"
              component={Link}
              size="small"
              to={{ pathname: `/pcb/partner/${pcb.id}`, state: { backQuery: location.search } }}
            >
              {t("common.view")}
            </Button>
          )}
          {pcbType !== PCB_TYPE_PARTNERS && (
            <React.Fragment>
              {pcb.status === "CREATED" && (
                <Button
                  className={clsx(classes.pcbActionButton, appTheme.buttonPrimary)}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    dispatch(pcbModalUpdate(pcb));
                    navigate({ pathname: "/pcb/request" });
                  }}
                >
                  {t("common.edit")}
                </Button>
              )}

              <Button
                className={clsx(classes.pcbActionButton, appTheme.buttonCreate)}
                variant="contained"
                component={Link}
                size="small"
                to={{ pathname: `/pcb/${pcb.id}`, state: { backQuery: location.search } }}
              >
                {t("common.view")}
              </Button>
            </React.Fragment>
          )}

          {pcbType === PCB_TYPE_PARTNERS && (
            <MoreButton onExportAsCSV={onExportPCB(pcb.id, "csv")} onExportAsExcel={onExportPCB(pcb.id, "xls")} />
          )}

          <div className={`${classes.removeItem} ${isResponse(pcb) ? classes.removeHidden : ""} pcb-row-delete`}>
            <ConfirmButton
              onAction={onDeleteClick(pcb.id)}
              onOpen={onDeleteSubmitOpen(pcb.id)}
              onClose={onDeleteSubmitClose}
              question={t("delete_pcb")}
            />
          </div>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default PcbRow;
