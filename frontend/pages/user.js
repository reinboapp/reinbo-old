import React from "react";

export default class extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { id };
  }

  render() {
    return (
      <div>
        <h1>User: {this.props.id}</h1>
      </div>
    );
  }
}
