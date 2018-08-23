import React, { Component } from 'react'

const Nav = ({
  addNewTrip,
  handleChange,
  username,
  value,
  trips,
  handleChangeTrip,
}) => (
    <div className="nav" >
      <div className="nav-dropdown">
        <select value={value} onChange={(event) => handleChangeTrip(event)}>
          {trips.map((trip, i) => {
            return <option key={`trip${i}`} id={trip.id} value={trip.name}>{trip.name}</option>
          })}
        </select>
      </div>
      <div className="nav-input">
        <input type="text" onChange={(event) => handleChange(event)} />
        <button className="btn" onClick={() => addNewTrip()}>Add Trip</button>
      </div>
      <div className="user-info">
        <div className="user-name">{username}</div>
      </div>
    </div>
  );


export default Nav;
