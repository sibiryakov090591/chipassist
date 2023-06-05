import React from "react";
import Page from "@src/components/Page";
import letter from "@src/images/suppliers_response/letter.png";
import requests_page from "@src/images/suppliers_response/requests_page.png";
import export_img from "@src/images/suppliers_response/export.png";
import exel from "@src/images/suppliers_response/exel.png";
import better_price from "@src/images/suppliers_response/better_price.png";
import SendIcon from "@material-ui/icons/Send";
import { Container, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./helpStyles";

const Help: React.FC = () => {
  const classes = useStyles();

  return (
    <Page title={"Help"} description={"User guide for requests.chipassist.com"} className={classes.main}>
      <section className={classes.section}>
        <Container maxWidth="md">
          <div className={classes.pageTitleContainer}>
            <h1 className={classes.pageTitle}>Awesome way of working with quotation requests</h1>
            <p className={classes.pageDescription}>
              ChipAssist offers you a unique way of processing user requests. Get subscribed to our daily mailing list
              and receive hundreds of selected RFQs from ChipAssist customers every day.
            </p>
          </div>
          <h2 className={classes.title}>How does it work?</h2>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item sm={6} className={classes.gridItem}>
              <div className={classes.icon}>
                <SendIcon />
              </div>
              <p>
                All our partners subscribed to our active RFQs list get a daily email with actual requests from our
                partnering company <a href="https://elfaro.ee/">ELFARO</a>.
              </p>
            </Grid>
            <Grid item sm={6} className={classes.rightColumn}>
              <img className={clsx(classes.img, classes.letterImg)} src={letter} alt="letter" />
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item sm={7}>
              <img style={{ width: "100%" }} className={classes.img} src={requests_page} alt="requests page" />
            </Grid>
            <Grid item sm={5} className={classes.rightColumn} style={{ alignSelf: "center" }}>
              <p>
                Seeing a demand for products that can be offered you can respond to the request(s) by visiting our RFQ
                processing portal{" "}
                <a href="https://requests.chipassist.com" target="_blank" rel="noreferrer">
                  https://requests.chipassist.com
                </a>
                .
              </p>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <p className={classes.p}>
            You can provide your stock, unit price, date code and lead time for every item you like. Additionally you
            can provide an alternative MPN and comments describing any information you would like to provide.
          </p>
          <p className={classes.p}>
            Once you have provided all the information required, just hit the “SEND DATA” button and your responses will
            be submitted to our database and provided to the customers.
          </p>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item sm={6} style={{ alignSelf: "center" }}>
              <h3>The second way to provide your responses</h3>
              <p>
                You also can export the list of the request to .xls file. This might be useful if you like to prepare
                your responses in .xls format.
              </p>
            </Grid>
            <Grid item sm={6} className={classes.rightColumn}>
              <img style={{ width: 300 }} className={classes.img} src={export_img} alt="export buttons" />
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <img style={{ width: "100%", marginBottom: 12 }} className={classes.img} src={exel} alt="exel image" />
          <p className={classes.p}>
            The list of RFQs for the last 24 hours will be exported and you will be able to fill the data right in the
            exported XLS file.
          </p>
          <p className={classes.p}>
            This option is useful if you need to share the requests with your partners and collect the responses. You
            can collect the responses in XLS file and then import this data back to the system using the “Import from
            XLS” button.
          </p>
          <p className={classes.p}>
            Your data will be loaded into the webform and sent to the server. You don’t need to click “SEND DATA” in
            this case.
          </p>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <img
            style={{ maxWidth: 600, marginBottom: 12 }}
            className={classes.img}
            src={better_price}
            alt="better price hint image"
          />
          <p className={classes.p}>
            If you see the item`s price field is yellow after the response, it means that another supplier has suggested
            a better price for this request. You can try reducing the price to provide a competitive offer.
          </p>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <h3>Limitations and suggestions</h3>
          <div className={classes.italic}>Time matters</div>
          <p className={classes.p}>
            Earlier received responses have better chances to be accepted by a customer. Due to this we suggest you to
            respond to the requests as fast as you can.
          </p>
          <div className={classes.italic}>Be responsible with your responses</div>
          <p className={classes.p}>
            Received quotes are communicated to the customers. Due to this they{" "}
            <strong>should be valid for at least 72 hours</strong>. Please mind that if you are unable to supply the
            goods at the responded price, this fact might be considered as a mislead.
          </p>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth="md">
          <h3>How to get started</h3>
          <p className={classes.p}>
            If you are not yet subscribed to a daily requests list and don’t have an account at{" "}
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
    </Page>
  );
};

export default Help;
