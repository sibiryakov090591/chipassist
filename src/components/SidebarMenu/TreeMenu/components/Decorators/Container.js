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
import themeColors from "../../../../../theme/theme_colors";

const _react = _interopRequireWildcard(require("react"));

const _propTypes = _interopRequireDefault(require("prop-types"));

const _velocityReact = require("velocity-react");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  const newObj = {};
  if (obj != null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const desc =
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i += 1) {
    const descriptor = props[i];
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

const Div = styled.div`
  ${(props) => props.active && `color: ${"red"}`}
  &:hover {
    background: ${themeColors.background_gray_hover};
  }
`;

const Container =
  /* #__PURE__ */
  (function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container() {
      _classCallCheck(this, Container);

      return _possibleConstructorReturn(this, _getPrototypeOf(Container).apply(this, arguments));
    }

    _createClass(Container, [
      {
        key: "renderToggle",
        value: function renderToggle() {
          const { animations } = this.props;

          if (!animations) {
            return this.renderToggleDecorator();
          }

          return _react.default.createElement(
            _velocityReact.VelocityComponent,
            {
              animation: animations.toggle.animation,
              duration: animations.toggle.duration,
            },
            this.renderToggleDecorator(),
          );
        },
      },
      {
        key: "renderToggleDecorator",
        value: function renderToggleDecorator() {
          const _this$props = this.props;
          const { style } = _this$props;
          const { decorators } = _this$props;
          return _react.default.createElement(decorators.Toggle, {
            style: style.toggle,
          });
        },
      },
      {
        key: "render",
        value: function render() {
          const _this$props2 = this.props;
          const { style } = _this$props2;
          const { decorators } = _this$props2;
          const { terminal } = _this$props2;
          const { onClick } = _this$props2;
          const { node } = _this$props2;
          let rendStyles = {};

          if (node.toggled) {
            rendStyles = node.children ? style.toggled : _objectSpread({}, style.container);
          } else {
            rendStyles = node.active ? _objectSpread({}, style.container) : _objectSpread({}, style.link);
          }
          if (!node.children) {
            rendStyles.borderBottom = `1px dashed ${themeColors.dark_blue}`;
          }
          if (node.active) {
            rendStyles = { ...rendStyles, fontWeight: "bold" };
          }

          return _react.default.createElement(
            Div,
            {
              onClick,
              style: rendStyles,
              className: "hover-div",
              active: !!node.active,
            },
            !terminal && node.depth !== 3 ? this.renderToggle() : null,
            _react.default.createElement(decorators.Header, {
              node,
              style: style.header,
            }),
          );
        },
      },
    ]);

    return Container;
  })(_react.PureComponent);

Container.propTypes = {
  style: _propTypes.default.object.isRequired,
  decorators: _propTypes.default.object.isRequired,
  terminal: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func.isRequired,
  animations: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]).isRequired,
  node: _propTypes.default.object.isRequired,
};
export default Container;
