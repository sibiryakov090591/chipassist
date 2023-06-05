import React, { useCallback, useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableSortLabel,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import {
  // pcbModalOpen,
  loadPcb,
  clearPcbResponse,
  deletePcbFromStore,
  getConstants,
} from "@src/store/pcb/pcbActions";
import setUrl from "@src/utils/setUrl";
import { Page } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import Paginate from "@src/components/Paginate";
import useHiddenColumns from "@src/components/Table/HiddenColumns/useHiddenColumns";
import useAppTheme from "@src/theme/useAppTheme";
import FiltersContainer, { FilterPageSizeChoiceBar, FilterResultsBar } from "@src/components/FiltersBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import PcbRow from "@src/views/chipassist/Pcb/components/PcbRow/PcbRow";
import PcbResponses from "@src/views/chipassist/Pcb/components/PcbResponses/PcbResponses";
import PcbMakeResponse from "@src/views/chipassist/Pcb/components/PcbMakeResponse/PcbMakeResponse";
import PcbCommentModal from "@src/views/chipassist/Pcb/components/PcbCommentModal/PcbCommentModal";
import { useStyles } from "./style";

export const PCB_TYPE_YOUR = "PCB_TYPE_YOUR";
export const PCB_TYPE_PARTNERS = "PCB_TYPE_PARTNERS";

const pcbTableHeaders = [
  {
    label: "column.id",
    name: "id",
    field: "id",
    isSort: true,
    isHideable: false,
    isShowDefault: true,
  },
  {
    label: "column.part_number",
    name: "partnumber",
    field: "part_number",
    isSort: true,
    isHideable: false,
    isShowDefault: true,
  },
  {
    label: "column.qty",
    name: "quantity",
    field: "quantity",
    isSort: true,
    isHideable: false,
    isShowDefault: true,
  },
  {
    label: "column.seller",
    name: "seller",
    field: "seller",
    isSort: true,
    isHideable: true,
    isShowDefault: true,
    visible: "user",
  },
  { label: "column.type", field: "pcbtype", isHideable: true },
  // { label: "Panel X", field: "panel_x", isHideable: true },
  // { label: "Panel Y", field: "panel_y", isHideable: true },
  { label: "column.thickness", field: "thickness", isHideable: true },
  { label: "column.x", field: "x", isHideable: true },
  { label: "column.y", field: "y", isHideable: true },
  { label: "column.base", field: "base", isHideable: true },
  { label: "column.unit_x", field: "unit_x", isHideable: true },
  { label: "column.unit_y", field: "unit_y", isHideable: true },
  { label: "column.copper", field: "copper", isHideable: true },
  { label: "column.count_rigid", field: "count_rigid", isHideable: true },
  { label: "column.count_flex", field: "count_flex", isHideable: true },
  { label: "column.finish", field: "finish", isHideable: true },
  { label: "column.soldermask", field: "soldermask", isHideable: true },
  { label: "column.soldermask_color", field: "soldermask_color", isHideable: true },
  { label: "column.track", field: "track", isHideable: true },
  { label: "column.legend", field: "legend", isHideable: true },
  { label: "column.legend_color", field: "legend_color", isHideable: true },
  { label: "column.spacing", field: "spacing", isHideable: true },
  { label: "column.hole", field: "hole", isHideable: true },
  { label: "column.hole_count", field: "hole_count", isHideable: true },
  { label: "column.profiling", field: "profiling", isHideable: true },
  {
    label: "column.period",
    name: "period",
    field: "period",
    isSort: true,
    isHideable: true,
    isShowDefault: true,
  },
  { label: "column.valid_date", field: "valid_date", isHideable: true },
  { label: "column.price", field: "price", isHideable: true },
  { label: "column.xout", field: "xout", isHideable: true },
  {
    label: "column.approved",
    name: "approved",
    field: "approved",
    isSort: true,
    isHideable: true,
    isShowDefault: true,
  },
  { label: "column.files_pcb", field: "files_pcb", isShowDefault: true, isHideable: true },
  {
    label: "column.comment",
    name: "comment",
    field: "comment",
    isSort: false,
    isHideable: true,
    isShowDefault: true,
  },
  { label: "column.status", name: "status", field: "status", isSort: true, isShowDefault: true, isHideable: true },
  {
    label: "column.created",
    name: "created",
    field: "created",
    isSort: true,
    isHideable: true,
    isShowDefault: true,
  },
];

function Pcb(props) {
  const { className } = props;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n("pcb");

  const [openedResponses, setOpenedResponses] = useState(null);
  const [makeResponse, setMakeResponse] = useState(null);
  const [openCommentModal, setOpenCommentModal] = useState(null);
  const [pcbType, setPcbType] = useState(PCB_TYPE_YOUR);
  const [showAll, setShowAll] = useState(false);

  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const isPcbsLoading = useAppSelector((state) => state.pcb.pcbsLoading);
  const pcbsNeedUpdate = useAppSelector((state) => state.pcb.pcbsNeedUpdate);
  const pcbs = useAppSelector((state) => state.pcb.pcbs);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);
  const pcbConstants = useAppSelector((state) => state.pcb.pcbConstants);
  const profile = useAppSelector((state) => state.profile.profileInfo);

  const storageKey = "PcbShowBy";

  const page = +useURLSearchParams("page", false, 1, false) || 1;
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem(`${storageKey}`) || _pageSize, false);
  const orderBy = useURLSearchParams("order_by", false, localStorage.getItem("pcbOrderBy") || "", false);

  const pcbsItems = pcbs.results || [];
  const [sort_name, sort_direction] = orderBy.split("_");
  const sortHeader = pcbTableHeaders.find((val) => val.name === sort_name);
  const showPartnersPcb = pcbType === PCB_TYPE_PARTNERS;
  const isPartner =
    (profile && profile.partners && !!profile.partners.length && !!profile.partners.find((val) => !!val.pcb)) || false;

  const hiddenDefault = pcbTableHeaders.reduce((acc, val) => {
    if (!val.isShowDefault && val.isHideable) return { ...acc, [val.label]: true };
    return acc;
  }, {});
  const { hiddenColumns, RenderAddColumnBar, RenderHideLabel } = useHiddenColumns(
    "pcbHiddenColumns",
    hiddenDefault,
    "pcb",
  );

  useEffect(() => {
    if (!pcbConstants) {
      dispatch(getConstants());
    }
  }, []);

  useEffect(() => {
    let pcbPageSettings = localStorage.getItem("pcbPageSettings");
    if (pcbPageSettings) {
      pcbPageSettings = JSON.parse(pcbPageSettings);
    }
    if (!isPcbsLoading) {
      dispatch(
        loadPcb(
          page,
          pageSize,
          orderBy,
          pcbPageSettings ? pcbPageSettings.pcbType === PCB_TYPE_PARTNERS : showPartnersPcb,
          pcbPageSettings ? pcbPageSettings.showAll : showAll,
        ),
      );
    }
    // eslint-disable-next-line
  }, [pcbsNeedUpdate, shouldUpdateBackend]);

  useEffect(() => {
    let pcbPageSettings = localStorage.getItem("pcbPageSettings");
    if (pcbPageSettings) {
      pcbPageSettings = JSON.parse(pcbPageSettings);
      setPcbType(isPartner ? pcbPageSettings.pcbType : PCB_TYPE_YOUR);
      setShowAll(pcbPageSettings.showAll);
    }
  }, [isPartner]);

  const reloadList = (page_size, in_page) => {
    if (page_size !== pageSize) {
      const new_page = in_page || 1;
      setUrl(navigate, "/pcb", new_page, page_size, { order_by: orderBy });
      dispatch(loadPcb(new_page, page_size, orderBy, showPartnersPcb, showAll));
    }
  };

  const onPageChangeHandle = (data) => {
    if (!isPcbsLoading) {
      setUrl(navigate, "/pcb", data.selected + 1, pageSize, {
        order_by: orderBy,
      });
      dispatch(loadPcb(data.selected + 1, pageSize, orderBy, showPartnersPcb, showAll));
    }
  };

  const onOpenResponses = (id) => () => {
    setOpenedResponses(id);
  };

  const onCloseResponses = () => {
    setOpenedResponses(null);
  };

  const onOpenMakeResponse = (id) => () => {
    setMakeResponse(id);
  };

  const onOpenCommentModal = (id) => () => {
    setOpenCommentModal(id);
  };

  const onCloseMakeResponse = () => {
    setMakeResponse(null);
    dispatch(clearPcbResponse());
  };

  const onCloseCommentModal = () => {
    setOpenCommentModal(null);
  };

  const onDeletePcbFromStore = (id) => {
    if (pcbType === PCB_TYPE_PARTNERS && !showAll) {
      dispatch(deletePcbFromStore(id));
    }
  };

  const getPcbById = (id) => {
    return pcbs.results.filter((item) => item.id === id)[0];
  };

  // eslint-disable-next-line no-shadow
  const savePcbPageSettings = (pcbType, showAll) => {
    localStorage.setItem(
      "pcbPageSettings",
      JSON.stringify({
        pcbType,
        showAll,
      }),
    );
  };

  const onChangeShowAll = useCallback(
    (e) => {
      setShowAll(e.target.checked);
      savePcbPageSettings(pcbType, e.target.checked);
      setUrl(navigate, "/pcb", 1, pageSize, { order_by: orderBy });
      dispatch(loadPcb(1, pageSize, orderBy, showPartnersPcb, e.target.checked));
    },
    [navigate, pcbType, pageSize, showPartnersPcb, orderBy],
  );

  const onChangePcbType = useCallback(
    (e) => {
      setPcbType(e.target.value);
      savePcbPageSettings(e.target.value, showAll);
      setUrl(navigate, "/pcb", 1, pageSize, { order_by: orderBy });
      dispatch(loadPcb(1, pageSize, orderBy, e.target.value === PCB_TYPE_PARTNERS, showAll));
    },
    [navigate, showAll, pageSize, orderBy],
  );

  const orderDirection = (name, reverse = false) => {
    const isCurrentHeader = sortHeader && sortHeader.name === name;
    let order = isCurrentHeader ? sort_direction : "asc";
    if (reverse && isCurrentHeader) order = order === "asc" ? "desc" : "asc";
    return order;
  };

  const onOrderChange = useCallback(
    (name, sort) => {
      const value = `${name}_${sort}`;
      localStorage.setItem("pcbOrderBy", value);
      setUrl(navigate, "/pcb", 1, pageSize, { order_by: value });
      dispatch(loadPcb(1, pageSize, value, showPartnersPcb, showAll));
    },
    [navigate, pageSize, showPartnersPcb, showAll],
  );

  const getLabel = (val) => {
    return !val.isSort ? (
      t(val.label)
    ) : (
      <TableSortLabel
        active={sortHeader && sortHeader.name === val.name}
        direction={orderDirection(val.name)}
        className={`${classes.tableSort} pcb-sort-${val.name}`}
        onClick={() => onOrderChange(val.name, orderDirection(val.name, true))}
      >
        {t(val.label)}
        {sortHeader && sortHeader.name === val.name ? (
          <span className={`${classes.visuallyHidden} pcb-sort-label-${val.name}`}>
            {sort_direction === "desc" ? "sorted desc" : "sorted asc"}
          </span>
        ) : null}
      </TableSortLabel>
    );
  };

  // const openPcbModal = () => {
  //   dispatch(pcbModalOpen());
  // };

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth="xl">
        <Box mt={5} mb={5}>
          <Card className={clsx(classes.root, className)}>
            <Box m={2} display="flex" alignItems="center" justifyContent="space-between">
              <Box disply="flex" alignItems="center">
                {isPartner && (
                  <TextField
                    id="pcb-type"
                    className="test-pcb-type"
                    select
                    label={t("type")}
                    value={pcbType}
                    onChange={onChangePcbType}
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem className={appTheme.selectMenuItem} value={PCB_TYPE_YOUR}>
                      {t("type_your")}
                    </MenuItem>
                    <MenuItem className={appTheme.selectMenuItem} value={PCB_TYPE_PARTNERS}>
                      {t("type_parent")}
                    </MenuItem>
                  </TextField>
                )}
                {pcbType === PCB_TYPE_PARTNERS && (
                  <FormControlLabel
                    className={`${classes.showAll} test-pcb-show-all`}
                    control={<Switch checked={showAll} onChange={onChangeShowAll} name="checkedB" color="primary" />}
                    label={t("show_all")}
                  />
                )}
                {pcbType !== PCB_TYPE_PARTNERS && (
                  <Button
                    variant="contained"
                    className={`${classes.btnCreatePcb} test-pcb-create-button ${appTheme.buttonCreate}`}
                    component={Link}
                    // onClick={openPcbModal}
                    to={{ pathname: `/pcb/request`, state: { backQuery: location.search } }}
                  >
                    {t("create")}
                  </Button>
                )}
              </Box>

              {pcbs ? (
                <Box display="flex" alignItems="center">
                  <FiltersContainer>
                    <FilterResultsBar count={pcbs?.count || 0} />
                    <FilterPageSizeChoiceBar storageKey={`${storageKey}`} action={reloadList} />
                  </FiltersContainer>
                </Box>
              ) : (
                <div />
              )}
            </Box>

            <CardHeader title={t("title")} />

            {isPcbsLoading && (
              <div className={classes.tableContentTdSkeleton}>
                <Preloader title={t("loading")} />
              </div>
            )}
            {!isPcbsLoading && (
              <div>
                <Box display="flex" justifyContent="flex-end" padding={1}>
                  <RenderAddColumnBar />
                </Box>
                <Box overflow="auto">
                  <Table className={`${classes.table} pcb-table`}>
                    <TableHead>
                      <TableRow>
                        {pcbTableHeaders.map((val) => {
                          if (hiddenColumns[val.label]) return null;
                          if (val.visible === "partner" && pcbType !== PCB_TYPE_PARTNERS) return null;
                          if (val.visible === "user" && pcbType === PCB_TYPE_PARTNERS) return null;
                          return (
                            <TableCell key={uuidv4()}>
                              {!val.isHideable ? (
                                getLabel(val)
                              ) : (
                                <RenderHideLabel.Container>
                                  {getLabel(val)}
                                  <RenderHideLabel.Button label={val.label} />
                                </RenderHideLabel.Container>
                              )}
                            </TableCell>
                          );
                        })}
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!isPcbsLoading && !!pcbsItems.length && (
                        <React.Fragment>
                          {pcbsItems.map((item) => {
                            return (
                              <PcbRow
                                key={item.id}
                                pcb={item}
                                columns={pcbTableHeaders}
                                hiddenColumns={hiddenColumns}
                                isPartner={isPartner}
                                pcbType={pcbType}
                                onOpenResponses={onOpenResponses(item.id)}
                                onMakeResponse={onOpenMakeResponse(item.id)}
                                onCommentClick={onOpenCommentModal(item.id)}
                              />
                            );
                          })}
                        </React.Fragment>
                      )}

                      {!isPcbsLoading && !pcbsItems.length && (
                        <tr className={classes.tableContentWhiteSpace}>
                          <td colSpan="100%">
                            <h2>{t("not_found")}</h2>
                          </td>
                        </tr>
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </div>
            )}
            {pcbs && pcbs.total_pages > 1 && (
              <Box p={4} display="flex" justifyContent="center">
                <Paginate pageCount={pcbs.total_pages} activePage={page} onPageChange={onPageChangeHandle} />
              </Box>
            )}
          </Card>
        </Box>
      </Container>

      {!!openedResponses && <PcbResponses onClose={onCloseResponses} pcb={getPcbById(openedResponses)} />}
      {!!makeResponse && (
        <PcbMakeResponse
          onClose={onCloseMakeResponse}
          onDeletePcbFromStore={onDeletePcbFromStore}
          pcb={getPcbById(makeResponse)}
          profile={profile}
        />
      )}
      {!!openCommentModal && <PcbCommentModal onClose={onCloseCommentModal} pcb={getPcbById(openCommentModal)} />}
    </Page>
  );
}

export default Pcb;
