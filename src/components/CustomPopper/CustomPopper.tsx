import React from "react";
import Popper from "@material-ui/core/Popper";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "@src/components/CustomPopper/styles";
import styled, { keyframes } from "styled-components";
import { swing } from "react-animations";

export const CustomPopper = (props: any) => {
  const { showPopup, arrowRef, arrow, setArrow, handleClosePopper } = props;

  const Bounce = styled.div`
    animation: 400ms ${keyframes`${swing}`} 100ms;
  `;

  const classes = useStyles();

  return (
    <Popper
      id={"popper"}
      open={showPopup}
      placement="top"
      disablePortal={true}
      modifiers={{
        flip: {
          enabled: false,
        },
        preventOverflow: {
          enabled: false,
          boundariesElement: "scrollParent",
        },
        arrow: {
          enabled: true,
          element: arrow,
        },
      }}
      anchorEl={arrowRef.current}
      className={classes.popperWrapper}
    >
      <span className={classes.arrow} ref={setArrow} />
      <Bounce>
        <div
          style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "column" }}
          className={classes.popper}
        >
          <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <span>No appropriate offers?</span>
            <CloseIcon className={classes.closeIcon} onClick={handleClosePopper} />
          </div>

          <p>Click this button and request the quotes.</p>
        </div>
      </Bounce>
    </Popper>
  );
};

export default CustomPopper;
