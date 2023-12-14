import urlJoin from "url-join";
import urlUtils from "url";
import { schema, apiHost, debug } from "../constants/defaults";

export function correctUrl(url) {
  if (!url) return null;

  let correctedUrl = url.trim();
  if (!correctedUrl.startsWith("http://") && !correctedUrl.startsWith("https://")) {
    correctedUrl = `https:${correctedUrl.startsWith("//") ? "" : "//"}${correctedUrl}`;
  }
  return correctedUrl;
}

export function addhttp(url) {
  const trimedUrl = url.trim();

  if (trimedUrl.startsWith("//")) {
    return urlJoin("http:", trimedUrl);
  }

  if (!/^(?:f|ht)tps?:\/\//.test(trimedUrl)) {
    return `http://${trimedUrl}`;
  }

  return trimedUrl;
}

export function changeHttpToHttps(urlString) {
  return urlString.replace(/^http:\/\//i, "https://");
}

export function getApiUrl(urlString) {
  return `http://server2.vsdg.ru/api/${urlString}`;
}

export function removeLocalHost(urlString) {
  if (!urlString) return "";
  return debug ? urlString.replace(/^http:\/\/localhost:3000\/api/i, "") : urlString;
}

export function removeHost(urlString) {
  if (!urlString) return "";
  return debug ? urlString.replace(/^http:\/\/.*\/api/i, "") : urlString;
}

export function removeLocalHostWithoutApi(urlString) {
  if (!urlString) return "";
  return debug ? urlString.replace(/^http:\/\/localhost:3000/i, "") : urlString;
}

export function addApiUrl(urlString) {
  if (debug) {
    const withoutLocalhost = removeLocalHostWithoutApi(urlString);
    const hasHttp = withoutLocalhost.lastIndexOf("http", 0);
    return hasHttp !== 0 ? `${schema}://${apiHost + withoutLocalhost}` : withoutLocalhost;
  }
  return urlString;
}

export function addCitiesApiUrl(urlString) {
  return `${removeLocalHostWithoutApi(urlString)}`;
}

export function changeHttpToHttpsIfBrowserLocationIsHttps(urlString) {
  if (window.location.protocol === "https:") return changeHttpToHttps(urlString);

  return urlString;
}

export function btoa(str) {
  let buffer;
  if (str instanceof Buffer) {
    buffer = str;
  } else {
    // eslint-disable-next-line no-buffer-constructor
    buffer = new Buffer(str.toString(), "binary");
  }
  return buffer.toString("base64");
}

export function getGidFromUri(hostPath) {
  return btoa(encodeURIComponent(hostPath));
}

export function getHostPathFromUrl(url) {
  const parsedUrl = urlUtils.parse(url.trim(), true);
  return parsedUrl.host + parsedUrl.path;
}
