import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Box, Tabs, Tab, Paper } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import FileCopy from "@material-ui/icons/FileCopy";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useParams, useNavigate } from "react-router-dom";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import { getAttributesThunk } from "@src/store/bom/bomActions";
import useAppSelector from "@src/hooks/useAppSelector";
import BomList from "./components/BomList/BomList";
import { useStyles } from "./style";
import BomUpload from "./components/BomUpload/BomUpload";
import BomEdit from "./components/BomViewNew/BomEdit";

const Bom: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("bom");
  const { bomId } = useParams();
  const path = window.location.pathname;
  const navigate = useNavigate();
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  let tab = path;
  if (tab !== "/bom/create" && tab !== "/bom/create-file") {
    tab = "/bom/bom-list";
  }

  useEffect(() => {
    dispatch(getAttributesThunk());
  }, [shouldUpdateBackend]);

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    return navigate(newValue);
  };

  return (
    <Page title={t("bom_tool")} description={t("page_description")}>
      <Container maxWidth="xl">
        <Box style={{ position: "relative" }} mt={5} mb={5}>
          <Paper square>
            <Tabs value={tab} onChange={onChangeTab} classes={{ fixed: classes.tabs }}>
              <Tab
                className={`${classes.tab} create-from-file-tab`}
                icon={<FileCopy />}
                label={t("bom_create_file")}
                value="/bom/create-file"
              />
              <Tab
                className={`${classes.tab} bom-lists-tab`}
                icon={<ListIcon />}
                label={t("bom_list")}
                value="/bom/bom-list"
              />
            </Tabs>
          </Paper>
          <Paper square>
            <Box className={classes.bomContainer}>
              {bomId ? (
                <BomEdit bomId={bomId || ""} />
              ) : (
                <>
                  {path === "/bom/bom-list" && <BomList />}
                  {path === "/bom/create-file" && <BomUpload />}
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Page>
  );
};

export default Bom;
