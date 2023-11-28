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
import { Button, Container, Grid, Theme } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppTheme } from "@src/themes/AppTheme";
import useAppTheme from "@src/theme/useAppTheme";
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
  },
  containerWithinSection: {},
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
}));

// export function useOnScreen(ref: RefObject<HTMLElement>) {
//   const [isIntersecting, setIntersecting] = useState(false);
//
//   const observer = useMemo(() => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)), [ref]);
//
//   useEffect(() => {
//     observer.observe(ref.current);
//
//     return () => observer.disconnect();
//   }, []);
//
//   return isIntersecting;
// }

export const About = () => {
  const classes = useStyles();
  const newClasses = useNewStyles();
  const appClasses = useAppTheme();
  const [isOpenFirstDescription, setIsOpenFirstDescription] = useState(false);
  const [isOpenSecondDescription, setIsOpenSecondDescription] = useState(false);
  const [isOpenThirdDescription, setIsOpenThirdDescription] = useState(false);
  return (
    <Page title={"About"} description={"User guide for requests.chipassist.com"} className={classes.main}>
      <section
        className={classes.firstWay}
        // ref={ref}
        style={{
          background: `linear-gradient(270deg, rgba(2,0,36,1) 6%, rgba(17,34,51,1) 57%, rgba(40,79,119,1) 100%)`,
          transition: "background 200 easy-out",
        }}
        id={"main"}
      >
        <Container maxWidth="md" style={{ maxWidth: "1200px" }}>
          <table width={"100%"}>
            <tbody>
              <tr>
                <td width={"50%"}>
                  <h1 className={classes.pageTitle}>New way of working with RFQs</h1>
                  <p className={classes.pageDescription}>Many customers, one service:</p>
                  <div className={classes.pageDescrSubDiv}>
                    <p>- Get request from the customers worldwide</p>
                    <p>- Compare your offer with competitive quotes</p>
                    <p>- Discuss payment and delivery terms</p>
                  </div>
                </td>
                <td width={"50%"}>
                  <img className={clsx(classes.img, classes.pageTitleImage)} src={supplier_logo} alt="requests page" />
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item sm={7} style={{ paddingTop: "6em" }}>
              <img className={classes.img} src={requests_page} alt="requests page" />
            </Grid>
            <Grid
              item
              sm={5}
              className={classes.rightColumn}
              style={{ alignSelf: "center", paddingTop: "6em", textAlign: "left" }}
            >
              <h2 className={newClasses.title}>Work with incoming requests in a completely new way</h2>
              <p>Get all your incoming requests for quotaion (RFQs) streamlined and displayed in a convenient way.</p>
              <p>
                See all request sorted by date with the origin country of the request and requested quantity for each
                MPN.
              </p>
              <div>
                <Button className={clsx(appClasses.buttonCreate, newClasses.linkButton)} href={"/supplier-response"}>
                  VIEW REQUESTS
                </Button>
                <Button
                  variant={"outlined"}
                  className={newClasses.button}
                  onClick={() => setIsOpenFirstDescription((prevState) => !prevState)}
                >
                  {isOpenFirstDescription ? "CLOSE" : "DISCOVER"}
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
              <p className={classes.p}>
                You can provide your{" "}
                <span className={newClasses.highlight}>stock, unit price, date code and lead time</span> for every item
                you like. Additionally you can provide an alternative MPN and comments describing any information you
                would like to provide.
              </p>
              <p className={classes.p}>
                Once you have provided all the information required, just hit the “SEND DATA” button and your responses
                will be submitted to our database and provided to the customers.
              </p>
            </Container>
          </section>
          <section className={classes.section}>
            <Container maxWidth="lg">
              <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item sm={6} style={{ alignSelf: "center", paddingTop: "2em" }}>
                  <h2 className={newClasses.title}>Use XLS format if you prefer</h2>
                  <p>
                    You also can export the list of the request to{" "}
                    <span className={newClasses.highlight}>.xls file</span>. This might be useful if you like to prepare
                    your responses in .xls format.
                  </p>
                </Grid>
                <Grid item sm={6} className={classes.rightColumn} style={{ paddingTop: "2em" }}>
                  <img style={{ width: 300 }} className={classes.img} src={export_img} alt="export buttons" />
                </Grid>
              </Grid>
            </Container>
          </section>
          <section className={classes.section}>
            <Container maxWidth="lg">
              <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item sm={6} className={classes.rightColumn} style={{ paddingTop: "6em" }}>
                  <img
                    style={{ marginBottom: 12 }}
                    className={clsx(classes.img)}
                    src={better_price}
                    alt="better price hint image"
                  />
                </Grid>
                <Grid item sm={6} style={{ alignSelf: "center", paddingTop: "4em" }}>
                  <h2 className={newClasses.title}>See competitive offers</h2>
                  <p className={classes.p}>
                    If you see the item`s price field is yellow after the response, it means that another supplier has
                    suggested a better price for this request. You can try reducing the price to provide a competitive
                    offer.
                  </p>
                </Grid>
              </Grid>
            </Container>
          </section>
          <section className={clsx(classes.section, classes.howToGetStarted)}>
            <Container maxWidth="lg">
              <h2 className={newClasses.title}>How to get started</h2>
              <p className={classes.p}>
                If you are <span className={newClasses.highlight}>not yet subscribed</span> to a daily requests list and
                don’t have an account at{" "}
                <a href="https://requests.chipassist.com" target="_blank" rel="noreferrer">
                  https://requests.chipassist.com
                </a>{" "}
                please send us an email to <a href="mailto:connect@chipassist.com">connect@chipassist.com</a>
              </p>
              <p className={classes.p}>
                If you already have an account you can visit{" "}
                <a href="https://requests.chipassist.com" target="_blank" rel="noreferrer">
                  https://requests.chipassist.com
                </a>{" "}
                any time to see new requests and respond to them.
              </p>
            </Container>
          </section>
          <section className={clsx(classes.section, classes.howToGetStarted)}>
            <Container maxWidth="lg">
              <h2 className={newClasses.title}>Limitations and suggestions</h2>
              <div className={classes.italic}>Time matters</div>
              <p className={classes.p}>
                Earlier received responses have better chances to be accepted by a customer. Due to this we suggest you
                to respond to the requests as fast as you can.
              </p>
              <div className={classes.italic}>Be responsible with your responses</div>
              <p className={classes.p}>
                Received quotes are communicated to the customers. Due to this they{" "}
                <strong>should be valid for at least 72 hours</strong>. Please mind that if you are unable to supply the
                goods at the responded price, this fact might be considered as a mislead.
              </p>
            </Container>
          </section>
        </>
      )}

      <section className={classes.section} style={{ backgroundColor: "#fbfbfb" }}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid
              item
              sm={5}
              className={classes.rightColumn}
              style={{ alignSelf: "center", paddingTop: "6em", textAlign: "left" }}
            >
              <h2 className={newClasses.title}>Easy and convinient comunications with customers</h2>
              <p>Get all your incoming requests for quotaion (RFQs) streamlined and displayed in a convenient way.</p>
              <p>
                See all request sorted by date with the origin country of the request and requested quantity for each
                MPN.
              </p>
              <div>
                <Button className={clsx(appClasses.buttonCreate, newClasses.linkButton)} href={"/messages"}>
                  VIEW MESSAGES
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
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item sm={7} style={{ paddingTop: "6em", paddingBottom: "6em" }}>
              <img className={classes.img} style={{ boxShadow: "none" }} src={invoices_image} alt="invoices image" />
            </Grid>
            <Grid
              item
              sm={5}
              className={classes.rightColumn}
              style={{ alignSelf: "center", paddingTop: "6em", textAlign: "left", paddingBottom: "6em" }}
            >
              <h2 className={newClasses.title}>Easily create and exchange Purchase Orders and Invoices</h2>
              <p>Receive approved Purchase Orders (POs) from your custommers with all necessary details.</p>
              <p>Generate, preview and send Payment Invoices to your customers just in several clicks.</p>
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
