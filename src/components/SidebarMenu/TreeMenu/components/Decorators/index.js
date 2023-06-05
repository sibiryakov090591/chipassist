/* eslint-disable no-proto */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-rest-params */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-func-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-void */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

const _Container = _interopRequireDefault(require("./Container"));

const _Header = _interopRequireDefault(require("./Header"));

const _Loading = _interopRequireDefault(require("./Loading"));

const _Toggle = _interopRequireDefault(require("./Toggle"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _default = {
  Container: _Container.default,
  Header: _Header.default,
  Loading: _Loading.default,
  Toggle: _Toggle.default,
};
exports.default = _default;
