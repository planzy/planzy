import React from 'react'

const TripsMenu = (props) => {
  const { trips } = props;
  return (
    <div>
      {trips.map((trip, i) => <div key={`trip${i}`} className="trip" id={trip.id}><div>{trip.name}</div></div>)}
    </div>
  );
}

export default TripsMenu;
