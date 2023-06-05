/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
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

const _react = _interopRequireDefault(require("react"));

const _propTypes = _interopRequireDefault(require("prop-types"));

const _lodash = require("lodash");

const _default2 = _interopRequireDefault(require("react-treebeard/dist/themes/default"));

const _animations = _interopRequireDefault(require("react-treebeard/dist/themes/animations"));

const _util = require("react-treebeard/dist/util");

const _common = require("./components/common");

const _Decorators = _interopRequireDefault(require("./components/Decorators"));

const _TreeNode = _interopRequireDefault(require("./components/TreeNode"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (let i = 1; i < arguments.length; i += 1) {
        const source = arguments[i];
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i += 1) {
    var source = arguments[i] != null ? arguments[i] : {};
    let ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }),
      );
    }
    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const TreeBeard = function TreeBeard(_ref) {
  const { animations } = _ref;
  const { decorators } = _ref;
  const { data } = _ref;
  const { onToggle } = _ref;
  const { style } = _ref;
  return _react.default.createElement(
    _common.Ul,
    {
      style: _objectSpread({}, _default2.default.tree.base, style.tree.base),
    },

    (0, _lodash.castArray)(data).map(function (node) {
      return _react.default.createElement(_TreeNode.default, {
        decorators,
        node,
        onToggle,
        animations,
        key: node.id || (0, _util.randomString)(),
        style: _objectSpread({}, _default2.default.tree.node, style.tree.node),
      });
    }),
  );
};

TreeBeard.propTypes = {
  style: _propTypes.default.object,
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]).isRequired,
  animations: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  onToggle: _propTypes.default.func,
  decorators: _propTypes.default.object,
};
TreeBeard.defaultProps = {
  style: _default2.default,
  animations: _animations.default,
  decorators: _Decorators.default,
};

export default TreeBeard;
