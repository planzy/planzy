import React from 'react';

export const ListItemInput = ({ dest, handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <input id={`form${dest}`} type="text" placeholder="itinerary item" />
      <button type="submit">+</button>
    </form>
  </div>
)
