import React, { Component } from 'react'; 
import { ListItem } from './ListItem';
import { ListItemInput } from './ListItemInput.jsx';

export const Destination = props => {
  const listItems = props.items ? props.items.map((item, index) => {
    return (<ListItem text={item.text} key={`item${index}`}/>);
  }) : [];
  console.log(props);
return (
  <div>
    {props.name}
    {/* <ListItemInput  handleSubmit={addListItem} /> */}
    <ul>
      {listItems}
    </ul>
  </div>
);
}