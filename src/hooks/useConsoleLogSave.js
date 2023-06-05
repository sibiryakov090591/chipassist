import { useEffect } from "react";

const useConsoleLogSave = () => {
  useEffect(() => {
    // Save last 30 console logs for feedback
    if (console.savedLogs === undefined) {
      console.savedLogs = [];
      console.defaultLog = console.log.bind(console);
      console.log = (...args) => {
        if (console.savedLogs.length > 30) console.savedLogs.splice(0, 20);
        console.savedLogs.push({ type: "log", datetime: Date().toLocaleString(), value: Array.from(args) });
        console.defaultLog(...args);
      };
      console.defaultError = console.error.bind(console);
      console.error = (...args) => {
        if (console.savedLogs.length > 30) console.savedLogs.splice(0, 20);
        console.savedLogs.push({ type: "error", datetime: Date().toLocaleString(), value: Array.from(args) });
        console.defaultError(...args);
      };
      console.defaultWarn = console.warn.bind(console);
      console.warn = (...args) => {
        if (console.savedLogs.length > 30) console.savedLogs.splice(0, 20);
        console.savedLogs.push({ type: "warn", datetime: Date().toLocaleString(), value: Array.from(args) });
        console.defaultWarn(...args);
      };
    }
  }, []);
};

export default useConsoleLogSave;
