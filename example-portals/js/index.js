'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// These two containers are siblings in the DOM
var appRoot = document.getElementById('app-root');
var modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.el = document.createElement('div');
    return _this;
  }

  Modal.prototype.componentDidMount = function componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  };

  Modal.prototype.render = function render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    this.props.children,
    // A DOM element
    this.el);
  };

  return Modal;
}(React.Component);

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = { showModal: false };

    _this2.handleShow = _this2.handleShow.bind(_this2);
    _this2.handleHide = _this2.handleHide.bind(_this2);
    return _this2;
  }

  App.prototype.handleShow = function handleShow() {
    this.setState({ showModal: true });
  };

  App.prototype.handleHide = function handleHide() {
    this.setState({ showModal: false });
  };

  App.prototype.render = function render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    var modal = this.state.showModal ? React.createElement(
      Modal,
      null,
      React.createElement(
        'div',
        { className: 'modal' },
        React.createElement(
          'div',
          null,
          'With a portal, we can render content into a different part of the DOM, as if it were any other React child.'
        ),
        'This is being rendered inside the #modal-container div.',
        React.createElement(
          'button',
          { onClick: this.handleHide },
          'Hide modal'
        )
      )
    ) : null;

    return React.createElement(
      'div',
      { className: 'app' },
      'This div has overflow: hidden.',
      React.createElement(
        'button',
        { onClick: this.handleShow },
        'Show modal'
      ),
      modal
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), appRoot);