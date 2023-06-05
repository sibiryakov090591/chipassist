/* eslint-disable @typescript-eslint/no-this-alias */
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

import styled from "@emotion/styled";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _animations = _interopRequireDefault(require("react-treebeard/dist/themes/animations"));

var _util = require("react-treebeard/dist/util");

var _common = require("../common");

var _NodeHeader = _interopRequireDefault(require("../NodeHeader"));

var _Drawer = _interopRequireDefault(require("./Drawer"));

var _Loading = _interopRequireDefault(require("./Loading"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var newObj = {};
  if (obj != null) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc =
          Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
        if (desc.get || desc.set) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj.default = obj;
  return newObj;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i += 1) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i += 1) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

const Li = styled.li``;

const TreeNode =
  /* #__PURE__ */
  (function (_PureComponent) {
    _inherits(TreeNode, _PureComponent);

    function TreeNode() {
      _classCallCheck(this, TreeNode);

      return _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).apply(this, arguments));
    }

    _createClass(TreeNode, [
      {
        key: "onClick",
        value: function onClick() {
          var _this$props = this.props;
          var { node } = _this$props;
          var { onToggle } = _this$props;
          var { toggled } = node;

          if (onToggle) {
            onToggle(node, !toggled);
          }
        },
      },
      {
        key: "animations",
        value: function animations() {
          var _this$props2 = this.props;
          var { animations } = _this$props2;
          var { node } = _this$props2;

          if (!animations) {
            return {
              toggle: _animations.default.toggle(this.props, 0),
            };
          }

          var animation = { ...animations, ...node.animations };
          return {
            toggle: animation.toggle(this.props),
            drawer: animation.drawer(this.props),
          };
        },
      },
      {
        key: "decorators",
        value: function decorators() {
          var _this$props3 = this.props;
          var { decorators } = _this$props3;
          var { node } = _this$props3;
          var nodeDecorators = node.decorators || {};
          return { ...decorators, ...nodeDecorators };
        },
      },
      {
        key: "renderChildren",
        value: function renderChildren(decorators) {
          var _this$props4 = this.props;
          var { animations } = _this$props4;
          var propDecorators = _this$props4.decorators;
          var { node } = _this$props4;
          var { style } = _this$props4;
          var { onToggle } = _this$props4;

          if (node.loading) {
            return _react.default.createElement(_Loading.default, {
              decorators,
              style,
            });
          }

          var { children } = node;

          if (!(0, _lodash.isArray)(children)) {
            children = children ? [children] : [];
          }

          return _react.default.createElement(
            _common.Ul,
            {
              style: style.subtree,
            },
            children.map(function (child) {
              return _react.default.createElement(TreeNode, {
                onToggle,
                animations,
                style,
                decorators: propDecorators,
                key: child.id || (0, _util.randomString)(),
                node: child,
              });
            }),
          );
        },
      },
      {
        key: "render",
        value: function render() {
          var _this = this;

          var _this$props5 = this.props;
          var { node } = _this$props5;
          var { style } = _this$props5;
          var decorators = this.decorators();
          var animations = this.animations();

          var restAnimationInfo = { ...animations.drawer };

          return _react.default.createElement(
            Li,
            {
              style: style.base,
            },
            _react.default.createElement(_NodeHeader.default, {
              decorators,
              animations,
              node,
              style,
              onClick: function onClick() {
                return _this.onClick();
              },
            }),
            _react.default.createElement(
              _Drawer.default,
              {
                restAnimationInfo: _objectSpread({}, restAnimationInfo),
              },
              node.toggled ? this.renderChildren(decorators, animations) : null,
            ),
          );
        },
      },
    ]);

    return TreeNode;
  })(_react.PureComponent);

TreeNode.propTypes = {
  onToggle: _propTypes.default.func,
  style: _propTypes.default.object.isRequired,
  node: _propTypes.default.object.isRequired,
  decorators: _propTypes.default.object.isRequired,
  animations: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]).isRequired,
};

export default TreeNode;
