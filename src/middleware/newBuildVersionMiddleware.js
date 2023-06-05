// import { staticI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { checkSiteVersion, checkSiteVersionPing } from "@src/constants/defaults";
// import { showTopRightMessageAlertAction } from "@src/store/alerts/alertsActions";

export default () => (next) => (action) => {
  if (!checkSiteVersion) return next(action);
  const versionPing = localStorage.getItem("versionPing");
  if (!versionPing) {
    localStorage.setItem("versionPing", Date.now());
  }
  if (parseInt(versionPing) + checkSiteVersionPing * 60000 < Date.now()) {
    // var myHeaders = new Headers();
    // myHeaders.append("pragma", "no-cache");
    // myHeaders.append('cache-control', 'no-cache');
    fetch("/version.txt")
      .then((res) => {
        return res.ok ? res.text() : null;
      })
      .then((res) => {
        console.log("***LOADED_VERSION.TXT: ", res);
        if (res && res !== (process.env.AWS_COMMIT_ID || COMMITHASH)) {
          localStorage.setItem("need_force_update", "true");
          // const { t } = staticI18n("common");
          // next(
          //   showTopRightMessageAlertAction({
          //     duration: null,
          //     text: t("outdated_site"),
          //     severity: "warning",
          //   }),
          // );
        }
      })
      .catch(() => {
        return false;
      });
    localStorage.setItem("versionPing", Date.now());
  }
  return next(action);
};
