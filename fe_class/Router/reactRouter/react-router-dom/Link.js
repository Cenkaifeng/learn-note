import React, { Component } from "react";
import context from "./context";

export default class Link extends Component {
  static contextType = context;
  render() {
    return (
      <a
        onClick={() => {
          this.context.history.push(to);
        }}
      >
        {this.props.children}
      </a>
    );
  }
}
