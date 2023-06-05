import i18next from "i18next";

export const getCurrentTime = () => {
  const d = new Date();
  const time = `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(-2)}-${`0${d.getDate()}`.slice(
    -2,
  )}_${`0${d.getHours()}`.slice(-2)}:${`0${d.getMinutes()}`.slice(-2)}:${`0${d.getSeconds()}`.slice(-2)}`;

  return time;
};

export const getISOStringWithoutSecsAndMilliseconds = (date) => {
  const dateAndTime = date.toISOString().split("T");
  const time = dateAndTime[1].split(":");

  return `${dateAndTime[0]}T${time[0]}:${time[1]}`;
};

export const getDateLag = (date1, date2) => {
  const diff = Math.abs(date2.getTime() - date1.getTime()) / 1000;
  // console.log("DIFF", diff);

  if (diff < 60) {
    return `<1${i18next.t("common.min")}`;
  }
  if (diff < 3600) {
    const ret = Math.ceil(diff / 60);
    return `${ret}${i18next.t("common.min")}`;
  }
  if (diff < 3600 * 24) {
    const ret = Math.ceil(diff / 3600);
    return `${ret}${i18next.t("common.h")}`;
  }
  const ret = Math.ceil(diff / (3600 * 24));
  return `${ret}${i18next.t("common.d")}`;
};

export default "func";
