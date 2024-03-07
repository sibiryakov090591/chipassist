import useAppSelector from "@src/hooks/useAppSelector";

const useIsAuthenticated = () => {
  const isAuthToken = useAppSelector((state) => state.auth.token !== null);
  const isAuthLoaded = useAppSelector((state) => !state.auth.loading);
  const isProfileLoaded = useAppSelector((state) => state.profile.profileInfo !== null);
  return { isAuthLoaded, isAuthenticated: isAuthLoaded && isAuthToken && isProfileLoaded };
};

export default useIsAuthenticated;
