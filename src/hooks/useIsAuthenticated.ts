import useAppSelector from "@src/hooks/useAppSelector";

const useIsAuthenticated = () => {
  const isAuthTokenExist = useAppSelector((state) => state.auth.token !== null);
  const isAuthLoaded = useAppSelector((state) => !state.auth.loading);
  const isProfileLoaded = useAppSelector((state) => state.profile.profileInfo !== null);
  return { isAuthLoaded, isAuthenticated: isAuthLoaded && isAuthTokenExist && isProfileLoaded };
};

export default useIsAuthenticated;
