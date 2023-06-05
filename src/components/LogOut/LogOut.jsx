import { logout } from "@src/store/authentication/authActions";
import { useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";

const LogOut = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);

  return false;
};

export default LogOut;
