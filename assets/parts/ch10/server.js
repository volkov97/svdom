const http = require("http");
const React = require("react");
const { renderToString } = require("react-dom/server");

class Hello extends React.Component {
  render() {
    return React.createElement(
        "div",
        {
            style: {
                fontSize: '3em',
                color: 'red'
            }
        },
        `Hello ${this.props.toWhat}`
    );
  }
}

http
  .createServer((req, res) => res.end(
    renderToString(React.createElement(Hello, { toWhat: "World" }, null))
  ))
  .listen(3000);
