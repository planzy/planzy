import React, { Component } from "react";
import Destinations from "./Destinations";

const Route = ({ destinations, changeDestId }) => {
  return (
    <div className="route">
      <Destinations changeDestId={changeDestId} destinations={destinations} />
    </div>
  );
}

export default Destinations;
