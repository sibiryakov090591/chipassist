import React from "react";
import { Box, Container } from "@material-ui/core";
import icon_1 from "@src/images/Homepage/chip_computer_cpu.svg";
import icon_2 from "@src/images/Homepage/board_aloupr.svg";
import icon_3 from "@src/images/Homepage/robotics_t2k7b0.svg";
import icon_4 from "@src/images/Homepage/dotted_fn2una.svg";
import icon_5 from "@src/images/Homepage/case_dsdvgh.svg";
import icon_6 from "@src/images/Homepage/keyboard_pkfwnp.svg";
import { Page } from "@src/components";
import { useStyles } from "./styles";

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Page
      title="ChipOnline - search and order electronic components"
      description="ChipOnline - search and order electronic components"
    >
      <Container maxWidth="xl">
        <h1 className={classes.title}>Instant search for more than 2,000,000+ components</h1>
        <h2 className={classes.subTitle}>
          We offer a wide range of electroniс components, printed circuit boards, accessories, hardware components, and
          many more.
        </h2>
        <p className={classes.text}>
          Enter a required part number in the search bar above and hit enter. If there are no exact results with the
          pricing <br /> information available, we&apos;ll find the necessary component for you manually.
        </p>
        <Box className={classes.itemsContainer}>
          <Box className={classes.item}>
            <Box className={classes.iconWrapper}>
              <img className={classes.icon} src={icon_1} alt="icon" />
            </Box>
            <span className={classes.itemTitle}>Electronic Components</span>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.iconWrapper}>
              <img className={classes.icon} src={icon_2} alt="icon" />
            </Box>
            <span className={classes.itemTitle}>Printed Circuit Boards (PCB)</span>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.iconWrapper}>
              <img className={classes.icon} src={icon_3} alt="icon" />
            </Box>
            <span className={classes.itemTitle}>Power Supplies</span>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.iconWrapper}>
              <img className={classes.icon} src={icon_4} alt="icon" />
            </Box>
            <span className={classes.itemTitle}>LEDs & LED Screens</span>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.iconWrapper}>
              <img className={classes.icon} src={icon_5} alt="icon" />
            </Box>
            <span className={classes.itemTitle}>Bodies & Cases</span>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.iconWrapper}>
              <img className={classes.icon} src={icon_6} alt="icon" />
            </Box>
            <span className={classes.itemTitle}>Silicone Keyboards</span>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default Home;
