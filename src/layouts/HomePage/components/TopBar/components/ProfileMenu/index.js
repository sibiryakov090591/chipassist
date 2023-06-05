import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { authCheckState } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

const ProfileMenu = (props) => {
  const classes = useStyles();
  const { children } = props;
  const dispatch = useAppDispatch();
  const reduxToken = useAppSelector((state) => state.auth.token);

  const [, setLocalToken] = React.useState(localStorage.getItem("token"));
  const [timeoutId, setTimeoutId] = React.useState(null);

  useEffect(() => {
    setLocalToken(reduxToken);
  }, [reduxToken]);

  useEffect(() => {
    const id = setTimeout(() => {
      setLocalToken((prev) => {
        const newState = localStorage.getItem("token");
        if (prev !== newState) {
          dispatch(authCheckState());
        }
        return newState;
      });
      setTimeoutId(id);
    }, 5000);
    return () => {
      clearTimeout(id);
    };
  }, [timeoutId]);

  return (
    <Box className={classes.showBy} display="flex">
      {children}
    </Box>
  );
};

export default ProfileMenu;
