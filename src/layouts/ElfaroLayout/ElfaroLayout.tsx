import React, { PropsWithChildren } from "react";
// import SearchBar from "@src/views/elfaro/Search/SearchBar/SearchBar";
// import { Container } from "@material-ui/core";
// import { useTheme } from "@material-ui/core";
import Header from "./Header/Header";
import { useStyles } from "./elfaroLayoutStyles";
import Footer from "./Footer/Footer";
// import Banner from "./Banner/Banner";

type Props = {};

const ElfaroLayout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const classes = useStyles();
  // const location = useLocation();
  // const theme = useTheme();
  // const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.banner}>
        {/* {location.pathname !== "/cart" && location.state?.background !== "/cart" && !isSmDown && <Banner />} */}
      </div>
      {/* <Container maxWidth="xl"> */}
      {/*  <SearchBar /> */}
      {/* </Container> */}
      <div className={classes.container}>
        <main className={classes.content}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default ElfaroLayout;
