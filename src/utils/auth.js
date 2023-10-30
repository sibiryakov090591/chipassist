export default () => {
  const token = getAuthToken();
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  return token !== null && token !== undefined && expirationDate > new Date();
};

export const isAuthPage = (previousLocation) => {
  return (
    previousLocation?.includes("/auth/") ||
    previousLocation?.includes("/password/request") ||
    previousLocation === "/logout" ||
    previousLocation === "/expired-link" ||
    previousLocation === "/terms_of_services" ||
    previousLocation === "/privacy_policy"
  );
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const isTestAccount = (fields) => {
  if (!fields?.length) return false;
  return fields.some((field) => field?.toLowerCase().includes("test"));
};
