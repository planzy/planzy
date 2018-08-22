import React, { Component } from "react";
import Header from "./Header";
import Waypoints from "./Waypoints";

class Route extends Component {
  render() {
    return (
      <div className="route">
        <Header />
        <Waypoints />
      </div>
    );
  }
}

export default Route;
