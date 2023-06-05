import React from "react";
import { Page } from "@src/components";
import { Container, Grid, Box, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import image from "@src/images/elfaro/pcb.svg";
import { useStyles } from "./styles";

const Pcb = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();

  return (
    <Page title="Printed Circuit Boards" description="Elfaro - search and order electronic components">
      <Container maxWidth="lg">
        <h1 className={classes.title}>Order your next PCB online</h1>
        <h2 className={classes.subTitle}>
          We offer Printed Circuit Boards, providing high quality and competitive price for wide range of PCB types.
        </h2>

        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Box display="flex" justifyContent="center">
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <CheckCircleIcon className={classes.listIcon} />
                  PCBs up to 64 layers
                </li>
                <li className={classes.listItem}>
                  <CheckCircleIcon className={classes.listIcon} />
                  Standard and special materials and finishing plates
                </li>
                <li className={classes.listItem}>
                  <CheckCircleIcon className={classes.listIcon} />
                  Impedance control
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box display="flex" justifyContent="center">
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <CheckCircleIcon className={classes.listIcon} />
                  Blinded and burried mechanical and laser drills
                </li>
                <li className={classes.listItem}>
                  <CheckCircleIcon className={classes.listIcon} />
                  100% electrical test
                </li>
                <li className={classes.listItem}>
                  <CheckCircleIcon className={classes.listIcon} />
                  Quality control
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>

        <p className={classes.paragraph}>
          <span className={classes.name}>Elfaro OÜ</span> is a technology partner of{" "}
          <span className={classes.name}>ChipAssist</span>, a global ecosystem of electronic components and services
          providers.
          <br />
          Order your PCB via ChipAssist and get the list of competitive offers for your request.
        </p>
        <Box display="flex" justifyContent="center">
          <a href="https://chipassist.com/pcb" target="_blank" rel="noreferrer">
            <Button color="primary" className={clsx(appTheme.buttonCreate, classes.button)}>
              ORDER ONLINE
            </Button>
          </a>
        </Box>
        <Box display="flex" justifyContent="center">
          <img className={classes.image} src={image} alt="PCB icon" />
        </Box>
      </Container>
    </Page>
  );
};

export default Pcb;
