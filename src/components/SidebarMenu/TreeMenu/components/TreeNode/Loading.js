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

const _common = require("../common");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const Loading = function Loading(_ref) {
  const { style } = _ref;
  const { decorators } = _ref;
  return _react.default.createElement(
    _common.Ul,
    {
      style: style.subtree,
    },
    _react.default.createElement(
      "li",
      null,
      _react.default.createElement(decorators.Loading, {
        style: style.loading,
      }),
    ),
  );
};

Loading.propTypes = {
  decorators: _propTypes.default.object.isRequired,
  style: _propTypes.default.object.isRequired,
};
const _default = Loading;
exports.default = _default;
