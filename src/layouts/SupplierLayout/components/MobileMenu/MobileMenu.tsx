import React, { useState } from "react";
import { IconButton, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";

import TopMenu from "../TopMenu/TopMenu";
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
          <Link to="/" onClick={() => window.location.pathname === "/" && navigate(0)}>
            <img alt="Logo" src={logo} style={{ width: 110, marginTop: 10 }} />
          </Link>
          <TopMenu isMobile={true} />
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default MobileMenu;
