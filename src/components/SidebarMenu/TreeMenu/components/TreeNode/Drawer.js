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

const _velocityReact = require("velocity-react");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const Drawer = function Drawer(_ref) {
  const { restAnimationInfo } = _ref;
  const { children } = _ref;
  return _react.default.createElement(_velocityReact.VelocityTransitionGroup, restAnimationInfo, children);
};

Drawer.propTypes = {
  restAnimationInfo: _propTypes.default.shape({}).isRequired,
  children: _propTypes.default.oneOfType([
    _propTypes.default.func,
    _propTypes.default.arrayOf(_propTypes.default.func, _propTypes.default.shape({})),
    _propTypes.default.shape({}),
  ]),
};
const _default = Drawer;
exports.default = _default;
