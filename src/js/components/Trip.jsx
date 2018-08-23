import React, { Component } from "react";
import Route from "./Route";
import Map from "./Map";

class Trip extends Component {
  render() {
    return (
      <div className="trip">
        <Route />
        <Map />
      </div>
    );
  }
}

export default Trip;
