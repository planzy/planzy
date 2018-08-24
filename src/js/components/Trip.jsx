/* globals fetch */
import React, { Component } from 'react';
import Route from './Route';
import Map from './Map';

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      destId: 0,
    };

    this.changeDestId = this.changeDestId.bind(this);
    this.addListItem = this.addListItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tripId !== this.props.tripId) {
      console.log('flicker');
      this.loadTrip();
    }
  }

  componentDidMount() {
    this.loadTrip();
  }

  loadTrip() {
    fetch(`/trips/${this.props.tripId || 2}`)
      .then(res => res.json())
      .then((destinations) => {
        this.setState({ destinations });
      })
      .catch(console.error);
  }

  changeDestId(event) {
    this.setState({
      destId: parseInt(event.target.id),
    })
  }

  addListItem(event) {
    event.preventDefault();
    const dest_id = event.target[0].id.slice(4);
    const name = event.target[0].value;
    event.target[0].value = '';
    const body = JSON.stringify({ dest_id, name });
    fetch('/list', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
      .then(() => this.loadTrip())
      .catch(console.error);
  }

  render() {
    return (
      <div className="trip">
        <Route
          destId={this.state.destId}
          destinations={this.state.destinations}
          changeDestId={this.changeDestId}
          addListItem={this.addListItem}
        />
        <Map destinations={this.state.destinations} />
      </div>
    );
  }
}

export default Trip;
