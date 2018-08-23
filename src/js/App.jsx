import React, { Component } from "react";
import Trip from "./components/Trip";
import Nav from './components/Nav';
import "../styles/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      username: undefined,
      trips: [],
      tripId: undefined,
      value: 'trips',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTrip = this.handleChangeTrip.bind(this);
    this.addNewTrip = this.addNewTrip.bind(this);

  }

  handleChange(event) {
    this.setState({
      tripName: event.target.value
    });
  }

  handleChangeTrip(event) {
    let index = event.target.selectedIndex;
    let el = event.target.childNodes[index]
    let option = el.getAttribute('id');

    this.setState({
      value: event.target.value,
      tripId: option,
    })
  }

  addNewTrip() {
    const trip = {
      name: this.state.tripName,
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
      .then(results => {
        const newTrips = [...this.state.trips, results[0]];
        console.log(newTrips);
        this.setState({
          trips: newTrips,
          tripName: '',
        })
      });
  }

  componentDidMount() {
    fetch(`http://localhost:3000/user/trips`)
      .then(response => {
        return response.json()
      })
      .then(results => {
        this.setState({
          username: results.username,
          trips: results.trips,
        })
      });
  }

  render() {

    const { trips, username, value, tripId } = this.state;

    return (
      <div>
        <Nav
          value={value}
          trips={trips}
          username={username}
          handleChangeTrip={this.handleChangeTrip}
          addNewTrip={this.addNewTrip}
          handleChange={this.handleChange}
        />
        <div className="planzy">
          <Trip tripId={tripId} />
        </div>
      </div >
    );
  }
};

export default App;
