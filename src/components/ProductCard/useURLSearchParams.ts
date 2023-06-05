import { useLocation } from "react-router-dom";

export function parseUrlParam(param: string, json = true) {
  return json ? JSON.parse(param) : param;
}

/**
 * Custom hook for extracting URL GET parameters
 * @param {string} parameter name
 * @param {boolean} shouldParse If need to decodeURIComponent
 * @param {any} defaultValue
 * @param {boolean} json Whether parameter is JSON serializable (e.g: an array)
 */
function useURLSearchParams(name: string, shouldParse: boolean, defaultValue: any, json = true) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  if (shouldParse) {
    return params.get(name) ? parseUrlParam(params.get(name), json) : defaultValue;
  }

  return params.get(name) ? params.get(name) : defaultValue;
}

export default useURLSearchParams;
