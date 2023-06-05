import React, { useState } from "react";
import { IconButton, Drawer, Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";

import Menu from "../Menu";
import { useStyles } from "./mobileMenuStyles";

interface Props {
  logo: string;
}

const MobileMenu: React.FC<Props> = ({ logo }) => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <IconButton
        className={classes.menuButton}
        onClick={() => setToggleMobileMenu(true)}
        color="inherit"
        aria-label="open menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        classes={{ paper: classes.drawerPapper }}
        anchor="left"
        open={toggleMobileMenu}
        onClose={() => setToggleMobileMenu(false)}
      >
        <div onClick={() => setToggleMobileMenu(false)} onKeyDown={() => setToggleMobileMenu(false)}>
          <Box style={{ height: "100vh" }} display="flex" flexDirection="column" justifyContent="space-between">
            <div>
              <Link to="/" onClick={() => window.location.pathname === "/" && navigate(0)}>
                <img alt="Logo" src={logo} className={classes.logo} />
              </Link>
              <Menu isMobile={true} linkClassName={classes.menuItem} />
            </div>
            <div style={{ padding: 20 }}>
              <div className={classes.link}>
                <a href="mailto:sales@elfaro.ee">sales@elfaro.ee</a>
              </div>
              <div className={classes.link}>
                <a href="tel:+37259007750">+372 5900 7750</a>
              </div>
            </div>
          </Box>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default MobileMenu;
