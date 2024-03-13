import React, { useCallback, useState, useRef } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { TableCell, MenuList, MenuItem, ClickAwayListener, Grow, Paper, Popper } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { units, STATUS_CHOICES } from "@src/store/pcb/pcbTypes";
import { updatePcbStatus } from "@src/store/pcb/pcbActions";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { format } from "date-fns";
import { PCB_TYPE_PARTNERS } from "../../Pcb";
import { useStyles } from "./styles";
import { useStyles as usePcbStyles } from "../../style";

function getLabel(items, val) {
  if (!items) return val;
  const res = items.find((item) => item.value === val);
  return res ? res.label : val;
}

const PcbRowFields = (props) => {
  const { columns, hiddenColumns, pcb, pcbType, onCommentClick } = props;
  const appTheme = useAppTheme();
  const classes = useStyles();
  const classesPcb = usePcbStyles();
  const dispatch = useAppDispatch();
  const [showAllSellers, setShowAllSellers] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] = useState(false);
  const statusButtonRef = useRef(null);
  const pcbConstants = useAppSelector((state) => state.pcb.pcbConstants);
  const { t } = useI18n("pcb");

  const commentLength = 100;

  const statusOptions = STATUS_CHOICES.slice(STATUS_CHOICES.findIndex((val) => val.value === pcb.status) + 1);

  const onToggleShowAll = useCallback(() => {
    setShowAllSellers((prev) => !prev);
  }, []);

  const sellers = (pcb.seller && !!pcb.seller.length && pcb.seller) || [];

  const handleStatusItemClick = (value) => {
    dispatch(updatePcbStatus(pcb.id, { status: value }));
    setOpenStatusMenu(false);
  };

  const handleStatusMenuToggle = () => {
    setOpenStatusMenu((prevOpen) => !prevOpen);
  };

  const handleStatusMenuClose = (event) => {
    if (statusButtonRef.current && statusButtonRef.current.contains(event.target)) {
      return;
    }
    setOpenStatusMenu(false);
  };

  return (
    <React.Fragment>
      {columns.map((column) => {
        if (hiddenColumns[column.label]) return null;
        if (column.visible === "partner" && pcbType !== PCB_TYPE_PARTNERS) return null;
        if (column.visible === "user" && pcbType === PCB_TYPE_PARTNERS) return null;

        let FieldRender = "";

        switch (column.field) {
          case "soldermask":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.SOLDERMASK, pcb[column.field])}</span>
            );
            break;
          case "soldermask_color":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.SOLDERMASK_COLOR, pcb[column.field])}</span>
            );
            break;
          case "legend":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.LEGEND, pcb[column.field])}</span>
            );
            break;
          case "legend_color":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.LEGEND_COLOR, pcb[column.field])}</span>
            );
            break;
          case "profiling":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.PROFILING, pcb[column.field])}</span>
            );
            break;
          case "copper":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.COPPER, pcb[column.field])}</span>
            );
            break;
          case "finish":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.FINISH, pcb[column.field])}</span>
            );
            break;
          case "base":
            FieldRender = (
              <span className="text">{pcbConstants && getLabel(pcbConstants.BASE, pcb[column.field])}</span>
            );
            break;
          case "pcbtype":
            FieldRender = (
              <span className="text">{pcbConstants && t(getLabel(pcbConstants.PANEL, pcb[column.field]))}</span>
            );
            break;
          case "seller":
            FieldRender = (
              <React.Fragment>
                <div className="text">
                  {(sellers.length > 2 && !showAllSellers ? sellers.slice(0, 2) : sellers).map((partner, index) => (
                    <div key={index} className={classes.seller}>
                      {partner.name}
                    </div>
                  ))}
                </div>
                {sellers.length > 2 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.sellersDisplayBtn}
                    onClick={onToggleShowAll}
                  >
                    {showAllSellers ? t("show_less") : t("show_more")}
                    {showAllSellers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Button>
                )}
              </React.Fragment>
            );
            break;
          case "approved":
            FieldRender = (
              <div className="text">
                {pcb.approved > 0 ? <CheckIcon style={{ color: green[500] }} /> : pcb.approved < 0 ? t("viewed") : ""}
              </div>
            );
            break;
          case "comment":
            FieldRender = (
              <React.Fragment>
                {pcb.comment && (
                  <span className={classes.tdCommentText}>
                    {`${pcb.comment.substring(0, commentLength)}${pcb.comment.length > commentLength ? "..." : ""}`}
                  </span>
                )}
                {pcbType !== PCB_TYPE_PARTNERS && (
                  <Button color="primary" size="small" onClick={onCommentClick} className={classes.responseBtn}>
                    {pcb.comment
                      ? pcb.comment.length > commentLength
                        ? t("common.view_all")
                        : !pcb.response_pcb.length
                        ? t("common.edit")
                        : ""
                      : t("common.add")}
                  </Button>
                )}
              </React.Fragment>
            );
            break;
          case "status":
            FieldRender = (
              <React.Fragment>
                {pcbType === PCB_TYPE_PARTNERS && (
                  <div className="text">
                    <Button variant="outlined" color="primary" size="small" style={{ cursor: "inherit" }}>
                      {t(STATUS_CHOICES.find((val) => pcb.status === val.value).label)}
                    </Button>
                  </div>
                )}

                {pcbType !== PCB_TYPE_PARTNERS && (
                  <div className="text">
                    <Button
                      ref={statusButtonRef}
                      variant={statusOptions.length ? "contained" : "outlined"}
                      color="primary"
                      size="small"
                      aria-controls={openStatusMenu ? "split-button-menu" : undefined}
                      aria-expanded={openStatusMenu ? "true" : undefined}
                      aria-haspopup="menu"
                      onClick={statusOptions.length ? handleStatusMenuToggle : null}
                      style={{ cursor: statusOptions.length ? "pointer" : "inherit" }}
                    >
                      {t(STATUS_CHOICES.find((val) => pcb.status === val.value).label)}
                      {!!statusOptions.length && <ArrowDropDownIcon />}
                    </Button>
                    <Popper open={openStatusMenu} anchorEl={statusButtonRef.current} role={undefined} transition>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleStatusMenuClose}>
                              <MenuList id="split-button-menu">
                                <MenuItem className={appTheme.selectMenuItem} disabled>
                                  {t("change_to")}:
                                </MenuItem>
                                {statusOptions.map((val, index) => (
                                  <MenuItem
                                    className={appTheme.selectMenuItem}
                                    key={index}
                                    value={val.value}
                                    onClick={() => handleStatusItemClick(val.value)}
                                  >
                                    {t(val.label)}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                )}
              </React.Fragment>
            );
            break;
          case "created":
            FieldRender = <span className="text">{format(new Date(pcb.created), "dd.MM.yyyy")}</span>;
            break;
          case "valid_date":
            FieldRender = <span className="text">{format(new Date(pcb.valid_date), "dd.MM.yyyy")}</span>;
            break;
          case "files_pcb":
            FieldRender = (
              <div className="text">
                {pcb.files_pcb.map((val) => (
                  <div key={val.id}>
                    <a href={val.url}>{val.url.match(new RegExp("([^/]*)$"))[0]}</a>
                  </div>
                ))}
              </div>
            );
            break;
          default:
            FieldRender = <span className={`text pcb-row-${column.field}`}>{pcb[column.field]}</span>;
            break;
        }

        return (
          <TableCell field={column.field} key={column.field}>
            {FieldRender}
            {!!pcb[column.field] && !!units[column.field] && (
              <span className={`${classesPcb.units} text`}>{t(units[column.field])}</span>
            )}
          </TableCell>
        );
      })}
    </React.Fragment>
  );
};

export default PcbRowFields;
