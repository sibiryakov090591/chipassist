import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AppBar, Box, Container, Toolbar, Hidden } from "@material-ui/core";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { ID_PCBONLINE } from "@src/constants/server_constants";
import MobileMenu from "./MobileMenu/MobileMenu";
import { useStyles } from "./topbarStyles";
// import CurrencyMenu from "../../HomePage/components/TopBar/components/CurrencyMenu/CurrencyMenu";
import ProfileMenu from "../../HomePage/components/TopBar/components/ProfileMenu/index";
import Authorized from "../../HomePage/components/TopBar/components/ProfileMenu/Authorized";
import NotAuthorized from "../../HomePage/components/TopBar/components/ProfileMenu/NotAuthorized";
import TopMenu from "./TopMenu/TopMenu";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoLightBack}`;

interface Props {
  className: string;
}

const TopBar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isPCBOnline = constants.id === ID_PCBONLINE;

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);
  // const currency = useAppSelector((state) => state.currency);

  const logoLink = (
    <Link style={{ display: "flex" }} to="/" onClick={() => window.location.pathname === "/" && navigate(0)}>
      <img alt="Logo" className={classes.logoImg} src={logo_img} />
    </Link>
  );

  return (
    <div>
      <AppBar className={clsx(classes.root, className)} position="static">
        <Container maxWidth="xl">
          <Hidden smDown>
            <Toolbar className={classes.toolbar}>
              {logoLink}
              {!isPCBOnline && <TopMenu isMobile={false} />}
              <Box display="flex">
                {/* {constants.currencyChanger && !!constants.selectedCurrencyList?.length && ( */}
                {/*  <Box> */}
                {/*    <CurrencyMenu */}
                {/*      containerClassName={classes.langBlock} */}
                {/*      buttonComponent={ */}
                {/*        <div style={{ display: "flex" }}> */}
                {/*          <div> */}
                {/*            <div>{currency?.selected?.code}</div> */}
                {/*            <div>{currency?.selected?.symbol}</div> */}
                {/*          </div> */}
                {/*          <div> */}
                {/*            <ArrowDropDownIcon /> */}
                {/*          </div> */}
                {/*        </div> */}
                {/*      } */}
                {/*    /> */}
                {/*  </Box> */}
                {/* )} */}
                <ProfileMenu>{isAuthenticated ? <Authorized /> : <NotAuthorized />}</ProfileMenu>
              </Box>
            </Toolbar>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.toolbar}>
              <div className={classes.mobileTopBar}>
                <div style={{ display: "flex", alignSelf: "center" }}>
                  {!isPCBOnline && <MobileMenu logo={logo_img} />}
                </div>
                <div style={{ display: "flex", alignSelf: "center" }}>{logoLink}</div>
                <div style={{ display: "flex", alignSelf: "center" }}>
                  <ProfileMenu>{!isAuthenticated && <NotAuthorized />}</ProfileMenu>
                </div>
              </div>
            </div>
          </Hidden>
        </Container>
      </AppBar>
    </div>
  );
};

export default TopBar;
