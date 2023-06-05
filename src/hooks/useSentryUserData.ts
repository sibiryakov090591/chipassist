import { useEffect } from "react";

import * as Sentry from "@sentry/react";
import useAppSelector from "@src/hooks/useAppSelector";

const useSentryUserData = () => {
  const profileInfo = useAppSelector((state) => state.profile?.profileInfo);
  useEffect(() => {
    if (profileInfo?.email) {
      Sentry.setUser({ email: profileInfo.email });
    } else {
      Sentry.configureScope((scope) => scope.setUser(null));
    }
  }, [profileInfo]);
};

export default useSentryUserData;
