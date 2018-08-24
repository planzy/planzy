import React, { Component } from 'react';
import Destinations from './Destinations';
import { Destination } from './Destination';

const Route = ({ destinations, changeDestId, destId, addListItem }) => {
  const [ activeDest ] = destinations.filter(dest => dest.id === destId);
  console.log(activeDest, destId);
  return (
    <div className="route">
      <Destinations changeDestId={changeDestId} destinations={destinations} />
      <Destination addListItem={addListItem} {...activeDest} />
    </div>
  );
}

export default Route;
