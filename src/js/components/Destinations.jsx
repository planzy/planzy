import React, { Component } from "react";

const Destinations = ({ destinations, changeDestId }) => {
  return (
    <div className="destinations">
      <h3>Destinations</h3>
      {destinations.map((dest, i) => {
        return <div key={`dest${i}`} className="destination" id={dest.id} onClick={(event) => changeDestId(event)}>{dest.name}</div>
      })}
    </div>
  )
}

export default Destinations;
