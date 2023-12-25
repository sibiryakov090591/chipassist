import React, { useState } from "react";
import Page from "@src/components/Page";
// import letter from "@src/images/suppliers_response/letter.png";
import requests_page from "@src/images/suppliers_response/requests_page.png";
import supplier_logo from "@src/images/suppliers_response/supplier_logo.png";
import chat_image from "@src/images/suppliers_response/chats.png";
import invoices_image from "@src/images/suppliers_response/invoices.png";
import export_img from "@src/images/suppliers_response/export.png";
import better_price from "@src/images/suppliers_response/better_price.png";
// import SendIcon from "@material-ui/icons/Send";
import { Button, Container, Grid, Theme, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./aboutStyles";

const useNewStyles = makeStyles((theme: Theme & AppTheme) => ({
  mainSection: {
    // minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
  },
  highlight: {
    color: theme.palette.app.red500,
    fontWeight: 700,
  },
  title: {
    fontSize: "2.4rem",
    paddingTop: "2rem",
    fontWeight: 400,
    lineHeight: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
      paddingTop: 0,
    },
  },
  button: {
    backgroundColor: "#fff",
    borderColor: "#dbdbdb",
    borderWidth: "1px",
    color: "#363636",
    cursor: "pointer",
    justifyContent: "center",
    paddingBottom: "calc(0.5em - 1px)",
    paddingLeft: "1em",
    paddingRight: " 1em",
    paddingTop: "calc(0.5em - 1px)",
    textAlign: "center",
    whiteSpace: "nowrap",
    marginLeft: "5px",
  },
  linkButton: {
    "&:hover": {
      color: "white",
    },
  },

  gridContainerMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },

  gridTextStyle: {
    alignSelf: "center",
    paddingTop: "6em",
    textAlign: "left",
    [theme.breakpoints.down("sm") && theme.breakpoints.up("xs")]: {
      paddingTop: "6rem!important",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0!important",
    },
  },
}));

export const About = () => {
  const classes = useStyles();
  const newClasses = useNewStyles();
  const appClasses = useAppTheme();
  const [isOpenFirstDescription, setIsOpenFirstDescription] = useState(false);

  const { t } = useI18n("supplier_response.about");
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page title={"About"} description={"User guide for requests.chipassist.com"} className={classes.main}>
      <section
        className={classes.firstWay}
        // ref={ref}
        id={"main"}
      >
        <Container maxWidth="lg" style={{ maxWidth: "1200px" }}>
          <Grid
            container
            spacing={4}
            alignItems={"center"}
            style={{ paddingBottom: isDownSm ? "2em" : null }}
            className={newClasses.gridContainerMobile}
          >
            <Grid item md={6} sm={6}>
              <h1 className={classes.pageTitle}>{t("top_elem.title")}</h1>
              <p className={classes.pageDescription}>{t("top_elem.subtitle")}:</p>
              <div className={classes.pageDescrSubDiv}>
                <p>- {t("top_elem.p1")}</p>
                <p>- {t("top_elem.p1")}</p>
                <p>- {t("top_elem.p1")}</p>
              </div>
            </Grid>
            <Grid item md={6} sm={6}>
              <img className={clsx(classes.img, classes.pageTitleImage)} src={supplier_logo} alt="requests page" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4} className={classes.gridContainer} alignItems={"center"}>
            <Grid item sm={7} style={{ paddingTop: "6em" }}>
              <img className={classes.img} src={requests_page} alt="requests page" />
            </Grid>
            <Grid item sm={5} className={clsx(classes.rightColumn, newClasses.gridTextStyle)}>
              <h2 className={newClasses.title}>{t("request_page.title")}</h2>
              <p>{t("request_page.subtitle")}</p>
              <p>{t("request_page.p1")}</p>
              <div>
                <Button className={clsx(appClasses.buttonCreate, newClasses.linkButton)} href={"/supplier-response"}>
                  {t("buttons.view_req")}
                </Button>
                <Button
                  variant={"outlined"}
                  className={newClasses.button}
                  onClick={() => setIsOpenFirstDescription((prevState) => !prevState)}
                >
                  {isOpenFirstDescription ? t("buttons.close") : t("buttons.discover")}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {isOpenFirstDescription && (
        <>
          <section className={clsx(classes.section)}>
            <Container maxWidth="lg">
              <p className={classes.p} dangerouslySetInnerHTML={{ __html: t("req_page_desc.p3") }}></p>
              <p className={classes.p}>{t("req_page_desc.p2")}</p>
            </Container>
          </section>
          <section className={classes.section}>
            <Container maxWidth="lg">
              <Grid
                container
                spacing={4}
                className={clsx(classes.gridContainer, newClasses.gridContainerMobile)}
                alignItems={"center"}
              >
                <Grid item sm={6} style={{ alignSelf: "center", paddingTop: isDownSm ? 0 : "2em" }}>
                  <h2 className={newClasses.title}>{t("req_page_desc.h")}</h2>
                  <p dangerouslySetInnerHTML={{ __html: t("req_page_desc.p3") }}></p>
                </Grid>
                <Grid item sm={6} className={classes.rightColumn} style={{ paddingTop: "2em" }}>
                  <img style={{ width: 300 }} className={classes.img} src={export_img} alt="export buttons" />
                </Grid>
              </Grid>
            </Container>
          </section>
          <section className={classes.section}>
            <Container maxWidth="lg">
              <Grid container spacing={4} className={classes.gridContainer} alignItems={"center"}>
                <Grid item sm={6} className={classes.rightColumn} style={{ paddingTop: "6em" }}>
                  <img
                    style={{ marginBottom: 12 }}
                    className={clsx(classes.img)}
                    src={better_price}
                    alt="better price hint image"
                  />
                </Grid>
                <Grid item sm={6} style={{ alignSelf: "center", paddingTop: isDownSm ? null : "4em" }}>
                  <h2 className={newClasses.title}>{t("req_page_desc.h_2")}</h2>
                  <p className={classes.p}>{t("req_page_desc.p4")}</p>
                </Grid>
              </Grid>
            </Container>
          </section>
          <section className={clsx(classes.section, classes.howToGetStarted)}>
            <Container maxWidth="lg">
              <h2 className={newClasses.title}>{t("req_page_desc.h_3")}</h2>
              <p className={classes.p} dangerouslySetInnerHTML={{ __html: t("req_page_desc.p5") }}></p>
              <p className={classes.p} dangerouslySetInnerHTML={{ __html: t("req_page_desc.p6") }}></p>
            </Container>
          </section>
          <section className={clsx(classes.section, classes.howToGetStarted)}>
            <Container maxWidth="lg">
              <h2 className={newClasses.title}>{t("req_page_desc.h_4")}</h2>
              <div className={classes.italic}>{t("req_page_desc.subtitle")}</div>
              <p className={classes.p}>{t("req_page.desc.p7")}</p>
              <div className={classes.italic}>{t("req_page_desc.subtitle_2")}</div>
              <p className={classes.p} dangerouslySetInnerHTML={{ __html: t("req_page_desc.p8") }}></p>
            </Container>
          </section>
        </>
      )}

      <section className={classes.section} style={{ backgroundColor: "#fbfbfb" }}>
        <Container maxWidth={"lg"}>
          <Grid
            container
            spacing={4}
            className={clsx(classes.gridContainer, newClasses.gridContainerMobile)}
            alignItems={"center"}
          >
            <Grid item sm={5} className={clsx(classes.rightColumn, newClasses.gridTextStyle)}>
              <h2 className={newClasses.title}>{t("messages.title")}</h2>
              <p>{t("messages.subtitle")}</p>
              <p>{t("messages.p1")}</p>
              <div>
                <Button className={clsx(appClasses.buttonCreate, newClasses.linkButton)} href={"/messages"}>
                  {t("buttons.view_mess")}
                </Button>
                {/* <Button */}
                {/*  variant={"outlined"} */}
                {/*  className={newClasses.button} */}
                {/*  onClick={() => setIsOpenSecondDescription((prevState) => !prevState)} */}
                {/* > */}
                {/*  {isOpenSecondDescription ? "CLOSE" : "DISCOVER"} */}
                {/* </Button> */}
              </div>
            </Grid>
            <Grid item sm={7} style={{ paddingTop: "6em" }}>
              <img className={classes.img} src={chat_image} alt="chats" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4} className={clsx(classes.gridContainer)} alignItems={"center"}>
            <Grid item sm={5} style={{ paddingTop: "6em", paddingBottom: isDownSm ? null : "6em" }}>
              <img className={classes.img} style={{ boxShadow: "none" }} src={invoices_image} alt="invoices image" />
            </Grid>
            <Grid item sm={6} className={clsx(classes.rightColumn, newClasses.gridTextStyle)}>
              <h2 className={newClasses.title}>{t("po_i.title")}</h2>
              <p>{t("po_i.p1")}</p>
              <p>{t("po_i.p2")}</p>
              {/* <div> */}
              {/*  <Button */}
              {/*    variant={"outlined"} */}
              {/*    className={newClasses.button} */}
              {/*    onClick={() => setIsOpenThirdDescription((prevState) => !prevState)} */}
              {/*  > */}
              {/*    {isOpenThirdDescription ? "CLOSE" : "DISCOVER"} */}
              {/*  </Button> */}
              {/* </div> */}
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* <section className={clsx(classes.section)}> */}
      {/*  <Container maxWidth="lg"> */}
      {/*    <Grid container spacing={4} className={classes.gridContainer}> */}
      {/*      <Grid item sm={7}> */}
      {/*        <img style={{ width: "100%" }} className={classes.img} src={requests_page} alt="requests page" /> */}
      {/*      </Grid> */}
      {/*      <Grid item sm={5} className={classes.rightColumn} style={{ alignSelf: "center" }}> */}
      {/*        <p> */}
      {/*          Seeing a demand for products that can be offered you can respond to the request(s) by visiting our RFQ */}
      {/*          processing portal{" "} */}
      {/*          <a href="https://requests.chipassist.com" target="_blank" rel="noreferrer"> */}
      {/*            https://requests.chipassist.com */}
      {/*          </a> */}
      {/*          . */}
      {/*        </p> */}
      {/*      </Grid> */}
      {/*    </Grid> */}
      {/*  </Container> */}
      {/* </section> */}
    </Page>
  );
};

export default About;
