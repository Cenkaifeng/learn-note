import React from "react";
import Context from "./context";

export default class BrowserRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        pathname: window.location.pathname || "/",
        search: undefined,
      },
      match: {},
    };
  }
  componentWillMount() {
    window.addEventListener("popstate", () => {
      this.setState({
        location: {
          pathname: window.location.pathname,
        },
      });
    });
  }
  render() {
    const currentRoute = {
      location: this.state.location,
      match: this.state.match,
      history: {
        push: to => {
          // 根据当前 to 去匹配不同的路由，实现路由切换
          if (typeof to === "object") {
            let { pathname, query } = to;
            // this.state.location.query = query;
            // this.state.location.pathname = pathname;
            this.setState({
              location: {
                query,
                pathname,
              },
            });
            window.history.pushState({}, {}, pathname);
          } else {
            // string
            // this.state.location.pathname = to;
            this.setState({
              location: {
                pathname: to,
              },
            });
            window.history.pushState({}, {}, to);
          }
          // this.setState({});
        },
      },
    };
    return (
      <Context.Provider value={currentRoute}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
