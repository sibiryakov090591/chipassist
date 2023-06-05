import { useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { INIT_ALERTS } from "@src/config";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";

const useJsErrorsCatch = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onerror = (message, url) => {
      console.log(`*** ERROR: ${message} ${url}`);
      if (INIT_ALERTS) {
        dispatch(
          showBottomLeftMessageAlertAction({
            text: `${message} <br/> ${url}`,
            severity: "error",
          }),
        );
      }
    };
  }, []);
};

export default useJsErrorsCatch;
