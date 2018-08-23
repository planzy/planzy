import React, { Component } from 'react'

const Nav = (props) => {
  const { addNewTrip, handleChange } = props;
  return (
    <div className="nav" >
      <div className="nav-dropdown">
        Menu
      </div>
      <div className="nav-input">
        <input type="text" onChange={(event) => handleChange(event)} />
        <button className="btn" onClick={() => addNewTrip()}>Add Trip</button>
      </div>
      <div className="user-info">
        <div className="user-name">Steve Shrimpman</div>
      </div>
    </div>
  );
}


export default Nav;