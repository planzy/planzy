import React, { Component } from "react";
import Trip from "./components/Trip";
import Nav from './components/Nav';
import TripsMenu from './components/TripsMenu.jsx';
import "../styles/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      user: {
        id: undefined,
        username: undefined
      },
      trips: [{
        id: 1,
        name: 'trips'
      }],
      tripId: undefined,
    }

    this.handleChange = this.handleChange.bind(this);
    this.addNewTrip = this.addNewTrip.bind(this);

  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      tripName: event.target.value
    });
  }

  addNewTrip() {
    const trip = {
      name: this.state.tripName,
      userId: this.state.user.id
    }

    fetch(`http://localhost:3000/trips`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(results => console.log(results));
  }


  render() {

    const { trips } = this.state;

    return (
      <div>
        <Nav addNewTrip={this.addNewTrip} handleChange={this.handleChange} />
        <TripsMenu trips={trips} />
        <div className="planzy">
          <Trip />
        </div>
      </div >
    );
  }
};

export default App;
