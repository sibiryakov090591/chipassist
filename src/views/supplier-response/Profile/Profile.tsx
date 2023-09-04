import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import { useStyles } from "./styles";
import { Header, General } from "./components";

const Profile = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { t } = useI18n("profile");
  // const theme = useTheme();
  // const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();
  const tab = location.pathname;

  /* const handleTabsChange = (event: React.ChangeEvent<{}>, value: any) => {
    navigate(`${value}`);
  }; */

  const tabs = [
    { value: "/profile/general", label: "General" },
    { value: "/profile/company/addresses", label: "Addresses" },
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
        {/* <Tabs */}
        {/*  variant="scrollable" */}
        {/*  scrollButtons={isXsDown ? "on" : "auto"} */}
        {/*  className={classes.tabs} */}
        {/*  onChange={handleTabsChange} */}
        {/*  value={tab} */}
        {/* > */}
        {/*  {tabs.map((val) => { */}
        {/*    if (!val) return null; */}
        {/*    return <Tab key={val.value} label={<div className={classes.label}>{val.label}</div>} value={val.value} />; */}
        {/*  })} */}
        {/* </Tabs> */}
        {/* <Divider className={classes.divider} /> */}
        <div className={classes.content}>{location.pathname === "/profile/general" && <General />}</div>
      </Container>
    </Page>
  );
};

export default Profile;
