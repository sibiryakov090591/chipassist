import React from "react";
import PropTypes from "prop-types";
import constants from "@src/constants/constants";
import { ID_ICSEARCH, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { Box, Container, Grid, Hidden } from "@material-ui/core";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./footerStyles";

const logo = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

let build = "";

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  try {
    if (constants.builds) {
      build = constants.builds;
    } else {
      build = "empty";
    }
  } catch (ReferenceError) {
    build = "any";
  }

  const theme = useTheme();
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const isDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const { t } = useI18n("footer");

  const navigateHandler = () => {
    window.scrollTo({ top: 0 });
  };

  const ICSInfo = () => {
    return (
      <noindex>
        <Box className={classes.navGroup}>
          <span style={{ color: "white", fontSize: "12px" }}>
            {"ООО 'ИНЕЛСО'"}
            <br />
          </span>
          <span style={{ color: "white", fontSize: "12px" }}>
            Санкт-Петербург, ул. Гельсингфорсская, дом 3, литера З, оф. 412
            <br />
          </span>
          <span style={{ color: "white", fontSize: "12px" }}>
            ИНН 7813635698
            <br />
          </span>
          <span style={{ color: "white", fontSize: "12px" }}>ОГРН 1197847128478</span>
        </Box>
      </noindex>
    );
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
      <footer className={isSupplierResponse ? classes.supplierFooter : classes.footer}>
        {constants.id !== ID_ICSEARCH ? (
          <Container maxWidth="lg" className={classes.bottomCont}>
            <Box className={classes.footerWrapper}>
              <Box className={classes.logo}>
                {logoLink}
                {isDownSm && (
                  <Box className={clsx(classes.navGroup)} style={{ marginTop: "12px" }}>
                    <a className={classes.navLink} style={{ fontWeight: "normal" }} href="mailto:info@chipassist.com">
                      info@chipassist.com
                    </a>
                    <a className={classes.navLink} style={{ fontWeight: "normal" }} href="tel:+41797137881">
                      +41 79 713 7881
                    </a>
                  </Box>
                )}
                <div className={classes.copy}>Copyright © {new Date().toISOString().slice(0, 4)} ChipAssist AG</div>
              </Box>
              <Box display="flex" className={classes.nav}>
                <Box display="flex" flexWrap="wrap">
                  <Box className={clsx(classes.navGroup, classes.contactClass)}>
                    <Box display={"flex"} flexDirection={"column"} style={{ marginBottom: isDownSm ? "2rem" : 0 }}>
                      <p className={classes.titleClass}>{t("follow_us")}</p>
                      <Grid container direction={"row"} spacing={1} wrap={"nowrap"}>
                        <Grid item>
                          <a
                            href="https://instagram.com/chipassistcom?igshid=NTc4MTIwNjQ2YQ=="
                            title="Chipassist on Instagram"
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={classes.navLink}
                          >
                            <InstagramIcon className={classes.socialIcon} />
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            href="https://www.facebook.com/ChipAssist/"
                            title="Chipassist on Facebook"
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={classes.navLink}
                          >
                            <FacebookIcon className={classes.socialIcon} />
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            href="https://www.linkedin.com/company/54117339"
                            title="Chipassist on LinkedIn"
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={classes.navLink}
                          >
                            <LinkedInIcon className={classes.socialIcon} />
                          </a>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
                <Box display={"flex"} className={classes.containerForFunctions} style={{ flexDirection: "initial" }}>
                  {isSupplierResponse && (
                    <Box className={classes.navGroup}>
                      <NavLink className={classes.navLink} to={"/supplier-response"} onClick={navigateHandler}>
                        {t("requests")}
                      </NavLink>
                      <NavLink className={classes.navLink} to={"/statistics"} onClick={navigateHandler}>
                        {t("statistics")}
                      </NavLink>
                      <NavLink className={classes.navLink} to={"/messages"} onClick={navigateHandler}>
                        {t("messages")}
                      </NavLink>
                      <NavLink className={classes.navLink} to={"/help"} onClick={navigateHandler}>
                        {t("help")}
                      </NavLink>
                    </Box>
                  )}
                  {!isSupplierResponse && (
                    <Box display="flex" flexWrap="wrap">
                      {isDownXs ? (
                        <>
                          <Box className={classes.navGroup}>
                            <NavLink className={classes.navLink} to={"/about_company"} onClick={navigateHandler}>
                              {t("about_us")}
                            </NavLink>
                            <NavLink className={classes.navLink} to={"/parts"} onClick={navigateHandler}>
                              {t("products")}
                            </NavLink>
                            <Hidden smDown>
                              <NavLink className={classes.navLink} to={"/bom/create-file"} onClick={navigateHandler}>
                                {t("menu.bom")}
                              </NavLink>
                            </Hidden>
                            <NavLink className={classes.navLink} to={"/rfq-list-quotes"} onClick={navigateHandler}>
                              {t("rfq_list")}
                            </NavLink>
                            <NavLink
                              className={classes.navLink}
                              to={"/sell-excess-inventory"}
                              onClick={navigateHandler}
                            >
                              {t("sell_on")} ChipAssist
                            </NavLink>
                            <NavLink className={classes.navLink} to={"/pcb"} onClick={navigateHandler}>
                              {t("request")} PCB
                            </NavLink>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box className={classes.navGroup}>
                            <NavLink className={classes.navLink} to={"/about_company"} onClick={navigateHandler}>
                              {t("about_us")}
                            </NavLink>
                            <NavLink className={classes.navLink} to={"/parts"} onClick={navigateHandler}>
                              {t("products")}
                            </NavLink>
                            <Hidden smDown>
                              <NavLink className={classes.navLink} to={"/bom/create-file"} onClick={navigateHandler}>
                                {t("menu.bom")}
                              </NavLink>
                            </Hidden>
                          </Box>
                          <Box className={classes.navGroup}>
                            <NavLink className={classes.navLink} to={"/rfq-list-quotes"} onClick={navigateHandler}>
                              {t("rfq_list")}
                            </NavLink>
                            <NavLink
                              className={classes.navLink}
                              to={"/sell-excess-inventory"}
                              onClick={navigateHandler}
                            >
                              {t("sell_on")} ChipAssist
                            </NavLink>
                            <NavLink className={classes.navLink} to={"/pcb"} onClick={navigateHandler}>
                              {t("request")} PCB
                            </NavLink>
                          </Box>
                        </>
                      )}
                    </Box>
                  )}
                  <Box display="flex" flexWrap="wrap">
                    <Box className={classes.navGroup}>
                      <NavLink className={classes.navLink} to={"/terms_of_services"} onClick={navigateHandler}>
                        {t("terms")}
                      </NavLink>
                      <NavLink className={classes.navLink} to={"/privacy_policy"} onClick={navigateHandler}>
                        {t("privacy")}
                      </NavLink>
                      {!isSupplierResponse && (
                        <>
                          <NavLink className={classes.navLink} to={`/blog`} onClick={navigateHandler}>
                            {t("blog")}
                          </NavLink>
                          <NavLink className={classes.navLink} to={"/FAQ"} onClick={navigateHandler}>
                            FAQ
                          </NavLink>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                {!isDownSm && (
                  <Box className={clsx(classes.navGroup, classes.contactInfoBox)}>
                    <p className={classes.titleClass} style={{ marginBottom: "3px" }}>
                      {t("contact_us")}:{" "}
                    </p>
                    <a className={classes.navLink} href="mailto:info@chipassist.com">
                      info@chipassist.com
                    </a>
                    <a className={classes.navLink} href="tel:+41797137881">
                      +41 79 713 7881
                    </a>
                  </Box>
                )}
              </Box>
            </Box>
            <div className={classes.commit}>
              version: {process.env.AWS_COMMIT_ID || COMMITHASH} | branch:{" "}
              {process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH} | mode:{" "}
              {process.env.AWS_BRANCH === "master" ? "development" : "production"} | build: {build}
            </div>
          </Container>
        ) : (
          <Container className={classes.icsearchContainer} maxWidth="xl">
            <Box className={classes.footerWrapper}>
              <Box className={classes.logo}>
                {logoLink}
                <div style={{ marginLeft: "0.7em" }}>
                  <Box className={classes.navLink}>
                    <a style={{ color: "white" }} href="mailto:info@icsearch.ru">
                      info@icsearch.ru
                    </a>
                  </Box>
                  <Box className={classes.navLink}>
                    <a style={{ color: "white" }} href="tel:+78126280016">
                      +7 (812) 628-00-16 доб.1125
                    </a>
                  </Box>
                </div>
                <Hidden smUp>
                  <Box display="flex" flexWrap="wrap" justifyContent={"flex-end"} textAlign={"start"}>
                    <ICSInfo />
                  </Box>
                </Hidden>
              </Box>
              <Box display="flex" className={classes.nav}>
                <Box display={"flex"} className={classes.containerForFunctions} style={{ flexDirection: "initial" }}>
                  <Box display="flex" flexWrap="wrap">
                    <Box className={classes.navGroup}>
                      <NavLink className={classes.navLinkICS} to={"/"} onClick={navigateHandler}>
                        {t("menu.home")}
                      </NavLink>
                      <NavLink className={classes.navLinkICS} to={"/parts"} onClick={navigateHandler}>
                        {t("products")}
                      </NavLink>
                      <Hidden mdUp>
                        <NavLink className={classes.navLinkICS} to={"/rfq-list-quotes"} onClick={navigateHandler}>
                          {t("rfq_list")}
                        </NavLink>
                      </Hidden>
                      <Hidden smDown>
                        <NavLink className={classes.navLinkICS} to={"/bom/create-file"} onClick={navigateHandler}>
                          {t("bom")}
                        </NavLink>
                        <NavLink className={classes.navLinkICS} to={"/rfq-list-quotes"} onClick={navigateHandler}>
                          {t("rfq_list")}
                        </NavLink>
                      </Hidden>
                    </Box>
                    <Box className={classes.navGroup}>
                      <Hidden xsDown>
                        <NavLink className={classes.navLinkICS} to={"/pcb"} onClick={navigateHandler}>
                          {t("menu.pcb")}
                        </NavLink>
                        <NavLink className={classes.navLinkICS} to={"/brands"} onClick={navigateHandler}>
                          {t("menu.brands")}
                        </NavLink>
                        <NavLink className={classes.navLinkICS} to={"/payment_and_delivery"} onClick={navigateHandler}>
                          {t("payment_and_delivery")}
                        </NavLink>
                        <NavLink className={classes.navLinkICS} to={"/privacy_policy"} onClick={navigateHandler}>
                          {t("privacy")}
                        </NavLink>
                        <a className={classes.navLinkICS} style={{ color: "white" }} href="mailto:info@icsearch.ru">
                          Сообщить об ошибке
                        </a>
                      </Hidden>
                    </Box>
                  </Box>
                  <Hidden smUp>
                    <Box display="flex" flexWrap="wrap" justifyContent={"flex-end"} flexDirection={"column"}>
                      <NavLink className={classes.navLinkICS} to={"/brands"} onClick={navigateHandler}>
                        {t("menu.brands")}
                      </NavLink>
                      <NavLink className={classes.navLinkICS} to={"/payment_and_delivery"} onClick={navigateHandler}>
                        {t("payment_and_delivery")}
                      </NavLink>
                      <NavLink className={classes.navLinkICS} to={"/privacy_policy"} onClick={navigateHandler}>
                        {t("privacy")}
                      </NavLink>
                      <a className={classes.navLinkICS} style={{ color: "white" }} href="mailto:info@icsearch.ru">
                        Сообщить об ошибке
                      </a>
                    </Box>
                  </Hidden>
                  <Hidden xsDown>
                    <Box display="flex" flexWrap="wrap" justifyContent={"flex-end"} width={"250px"}>
                      <ICSInfo />
                    </Box>
                  </Hidden>
                </Box>
              </Box>
            </Box>
            <div className={classes.commit}>
              version: {process.env.AWS_COMMIT_ID || COMMITHASH} | branch:{" "}
              {process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH} | mode:{" "}
              {process.env.AWS_BRANCH === "master" ? "development" : "production"} | build: {build}
            </div>
          </Container>
        )}
      </footer>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
