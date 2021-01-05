import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "utils/public";
export default class AutnRoute extends React.Component {
  render() {
    console.info(this.props.route);
    return getToken() ? (
      <Route {...this.props.route}></Route>
    ) : (
      <Redirect to="/login" />
    );
  }
}
