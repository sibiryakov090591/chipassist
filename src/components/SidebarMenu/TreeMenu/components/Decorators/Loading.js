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

const _react = _interopRequireDefault(require("react"));

const _propTypes = _interopRequireDefault(require("prop-types"));

const _styled = _interopRequireDefault(require("@emotion/styled"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const Loading = (0, _styled.default)(function (_ref) {
  const { className } = _ref;
  return _react.default.createElement(
    "div",
    {
      className,
    },
    "loading...",
  );
})(function (_ref2) {
  const { style } = _ref2;
  return style;
});
Loading.propTypes = {
  style: _propTypes.default.object,
};
const _default = Loading;
exports.default = _default;
