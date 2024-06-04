import React from "react";
import PropTypes from "prop-types";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { Box, Container, Hidden } from "@material-ui/core";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./footerStyles";

const logo = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useI18n("footer");

  const navigateHandler = () => {
    window.scrollTo({ top: 0 });
  };

  const logoLink = (
    <Link
      to="/"
      onClick={() => {
        window.scrollTo({ top: 0 });
        if (window.location.pathname === "/") navigate(0);
      }}
    >
      <img alt="Logo" className={classes.logoImg} src={logo} />
      {constants.id === ID_ICSEARCH && <br />}
    </Link>
  );

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container className={classes.icsearchContainer} maxWidth="lg">
          <Box className={classes.footerWrapper}>
            <Box className={classes.logo}>{logoLink}</Box>
            <Box display="flex">
              <Box display={"flex"} className={classes.containerForFunctions} style={{ flexDirection: "initial" }}>
                <Box className={classes.navGroup}>
                  <NavLink
                    style={{ gridArea: "home" }}
                    className={classes.navLinkICS}
                    to={"/"}
                    onClick={navigateHandler}
                  >
                    {t("menu.home")}
                  </NavLink>
                  <NavLink
                    style={{ gridArea: "products" }}
                    className={classes.navLinkICS}
                    to={"/parts"}
                    onClick={navigateHandler}
                  >
                    {t("products")}
                  </NavLink>
                  <Hidden smDown>
                    <NavLink
                      style={{ gridArea: "bom" }}
                      className={classes.navLinkICS}
                      to={"/bom/create-file"}
                      onClick={navigateHandler}
                    >
                      BOM Tool
                    </NavLink>
                  </Hidden>
                  <NavLink
                    style={{ gridArea: "rfq" }}
                    className={classes.navLinkICS}
                    to={"/rfq-list-quotes"}
                    onClick={navigateHandler}
                  >
                    {t("rfq_list")}
                  </NavLink>
                  <NavLink
                    style={{ gridArea: "pcb" }}
                    className={classes.navLinkICS}
                    to={"/pcb"}
                    onClick={navigateHandler}
                  >
                    {t("menu.pcb")}
                  </NavLink>
                  <NavLink
                    style={{ gridArea: "brands" }}
                    className={classes.navLinkICS}
                    to={"/brands"}
                    onClick={navigateHandler}
                  >
                    Brands
                  </NavLink>
                  <NavLink
                    style={{ gridArea: "terms" }}
                    className={classes.navLinkICS}
                    to={"/payment_and_delivery"}
                    onClick={navigateHandler}
                  >
                    Terms
                  </NavLink>
                  <NavLink
                    style={{ gridArea: "privacy" }}
                    className={classes.navLinkICS}
                    to={"/privacy_policy"}
                    onClick={navigateHandler}
                  >
                    {t("privacy")}
                  </NavLink>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </footer>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
