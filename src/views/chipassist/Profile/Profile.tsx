import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Divider, Container, Button, Box, useTheme, useMediaQuery } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import CompanyAddress from "@src/views/chipassist/Profile/components/CompanyAddress";
import { Page } from "@src/components";
import Rfq from "@src/views/chipassist/Rfq/Rfq.tsx";
import Orders from "@src/views/chipassist/Orders/Orders";
import BomList from "@src/views/chipassist/Bom/components/BomList/BomList";
import clsx from "clsx";
import PublishIcon from "@material-ui/icons/Publish";
import useAppTheme from "@src/theme/useAppTheme";
import ChatUnreadTotalCount from "@src/components/ChatUnreadTotalCount/ChatUnreadTotalCount";
import { useStyles } from "./styles";
import { Header, General } from "./components";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n("profile");
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();
  const appTheme = useAppTheme();
  const tab = location.pathname;

  const handleTabsChange = (event: React.ChangeEvent<{}>, value: any) => {
    navigate(`${value}`);
  };

  const tabs = [
    { value: "/profile/general", label: t("general.title") },
    { value: "/profile/company/addresses", label: t("company.address") },
    { value: "/profile/requests", label: t("menu.rfqs") },
    { value: "/profile/orders", label: t("menu.orders") },
    { value: "/profile/bom-list", label: t("menu.bom") },
    // { value: "/profile/notifications", label: t("notifications.title") },
    // { value: "/profile/security", label: t("security.title") },
  ];

  if (!tabs.find((val) => val.value === tab)) {
    return <Navigate to="/errors/error-404" replace />;
  }

  return (
    <Page
      className={classes.root}
      title={t("page_title")}
      description={t("page_description")}
      style={{ height: "100%" }}
    >
      <Container maxWidth="xl" className={classes.container}>
        <Header />
        <Tabs
          variant="scrollable"
          scrollButtons={isXsDown ? "on" : "auto"}
          className={classes.tabs}
          onChange={handleTabsChange}
          value={tab}
        >
          {tabs.map((val) => {
            if (!val) return null;
            if (val.value === "/profile/bom-list" && isSmDown) return null;
            return (
              <Tab
                key={val.value}
                label={
                  <div className={classes.label}>
                    {val.label}
                    {val.value === "/profile/messages" && <ChatUnreadTotalCount className={classes.chatUnreadCount} />}
                  </div>
                }
                value={val.value}
              />
            );
          })}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {location.pathname === "/profile/general" && <General />}
          {/* {location.pathname === "/profile/notifications" && <Notifications />} */}
          {/* {location.pathname === "/profile/security" && <Security />} */}
          {location.pathname === "/profile/company/addresses" && <CompanyAddress />}
          {location.pathname === "/profile/requests" && <Rfq />}
          {location.pathname === "/profile/orders" && <Orders />}
          {location.pathname === "/profile/bom-list" && (
            <>
              <Box display="flex" justifyContent="center">
                <Button
                  component={Link}
                  to="/bom/create-file"
                  color="primary"
                  variant="contained"
                  className={clsx(appTheme.buttonCreate, classes.uploadButton)}
                >
                  {t("bom.upload.upload")}
                  <PublishIcon />
                </Button>
              </Box>
              <BomList />
            </>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default Profile;
