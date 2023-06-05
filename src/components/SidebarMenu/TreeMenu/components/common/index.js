/* eslint-disable no-void */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Ul = exports.Div = void 0;

const _styled = _interopRequireDefault(require("@emotion/styled"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const Div = (0, _styled.default)("div", {
  shouldForwardProp: function shouldForwardProp(prop) {
    return ["className", "children"].indexOf(prop) !== -1;
  },
})(function (_ref) {
  const { style } = _ref;
  return style;
});
exports.Div = Div;
const Ul = (0, _styled.default)("ul", {
  shouldForwardProp: function shouldForwardProp(prop) {
    return ["className", "children"].indexOf(prop) !== -1;
  },
})(function (_ref2) {
  const { style } = _ref2;
  return style;
});
exports.Ul = Ul;
