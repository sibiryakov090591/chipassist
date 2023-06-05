import React from "react";
import logo from "@src/images/logos/en/logo_darkback.png";
import bom_icon from "@src/images/elfaro/banner_bom.png";
import pcb_icon from "@src/images/elfaro/banner_pcb.png";
import chip_icon from "@src/images/elfaro/banner_chip.png";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";

const Banner: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <h1 className={classes.title}>
              Elfaro is the official partner of{" "}
              <a className={classes.link} href="https://chipassist.com" target="_blank" rel="noreferrer">
                ChipAssist
              </a>{" "}
              in Europe
            </h1>
            <p style={{ fontSize: "1.2rem", marginTop: 20 }}>
              <a className={classes.link} href="https://chipassist.com" target="_blank" rel="noreferrer">
                ChipAssist
              </a>{" "}
              unites suppliers of <strong>electronic components</strong> and leading <strong>PCB</strong> manufacturers
              from all over the world
            </p>
            <p style={{ fontSize: "1rem", marginBottom: 20 }}>
              Start using{" "}
              <a className={classes.link} href="https://chipassist.com" target="_blank" rel="noreferrer">
                ChipAssist
              </a>{" "}
              and get access to{" "}
              <a
                style={{ fontSize: "1.4rem" }}
                className={classes.link}
                href="https://chipassist.com"
                target="_blank"
                rel="noreferrer"
              >
                20,000,000+
              </a>{" "}
              parts
            </p>
          </Grid>
          <Grid className={classes.center} item md={6} xs={12}>
            <div className={classes.icons}>
              <a className={classes.iconLink} href="https://chipassist.com" target="_blank" rel="noreferrer">
                <img src={chip_icon} alt="Chip" />
                <div>
                  <strong>20,000,000+</strong>
                </div>
                <div>electronic parts</div>
              </a>
              <a className={classes.iconLink} href="https://chipassist.com/pcb" target="_blank" rel="noreferrer">
                <img src={pcb_icon} alt="PCB" />
                <div>
                  Leading <strong>PCB</strong>
                </div>
                <div>manufacturers</div>
              </a>
              <a
                className={classes.iconLink}
                href="https://chipassist.com/bom/create-file"
                target="_blank"
                rel="noreferrer"
              >
                <img src={bom_icon} alt="BOM" />
                <div>Fast and efficient</div>
                <div>
                  <strong>BOM processing</strong>
                </div>
              </a>
            </div>
            <a className={classes.logo} href="https://chipassist.com" target="_blank" rel="noreferrer">
              <img src={logo} alt="chip assist logo" />
            </a>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Banner;
