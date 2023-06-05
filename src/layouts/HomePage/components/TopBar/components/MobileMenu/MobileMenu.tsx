import React, { useState } from "react";
import { IconButton, Drawer, Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
import constants from "@src/constants/constants";
import { ID_CHIPASSIST } from "@src/constants/server_constants";
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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          style={{ height: "100vh" }}
          onClick={() => setToggleMobileMenu(false)}
          onKeyDown={() => setToggleMobileMenu(false)}
        >
          <div>
            <Link to="/" onClick={() => window.location.pathname === "/" && navigate(0)}>
              <img alt="Logo" src={logo} style={{ display: "block", width: 110, margin: "12px auto 0" }} />
            </Link>
            <TopMenu isMobile={true} />
          </div>
          {constants.id === ID_CHIPASSIST && (
            <div>
              <a href="mailto:info@chipassist.com" className={classes.contactLink}>
                info@chipassist.com
              </a>
              <a href="tel:+41797137881" className={classes.contactLink}>
                +41 79 713 7881
              </a>
            </div>
          )}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default MobileMenu;
