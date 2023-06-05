/* eslint-disable import/no-extraneous-dependencies */
// This file configures a web server for testing the production build
// on your local machine.

import browserSync from "browser-sync";
import historyApiFallback from "connect-history-api-fallback";
import proxy from "http-proxy-middleware";
import { chalkProcessing } from "./chalkConfig";
import { apiUrl } from "../src/constants/defaults";

/* eslint-disable no-console */

console.log(chalkProcessing("Opening production build..."));

// Run Browsersync
browserSync({
  port: 4000,
  ui: {
    port: 4001,
  },
  server: {
    baseDir: "dist",
    serveStaticOptions: {
      extensions: ["html"],
    },
  },

  files: ["src/*.html"],

  middleware: [historyApiFallback(), proxy("/api/**", { target: apiUrl })],
});
