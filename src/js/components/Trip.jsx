/* globals fetch */
import React, { Component } from 'react';
import Route from './Route';
import Map from './Map';

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      destId: undefined,
    };

    this.changeDestId = this.changeDestId.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tripId !== this.props.tripId) {
      console.log('flicker');
      fetch(`/trips/${this.props.tripId || 2}`)
        .then(res => {
          return res.json();
        })
        .then((destinations) => {
          this.setState({ destinations });
        })
        .catch(console.error);
    }
  }

  componentDidMount() {
    fetch(`/trips/${this.props.tripId || 2}`)
      .then(res => {
        return res.json();
      })
      .then((destinations) => {
        this.setState({ destinations });
      })
      .catch(console.error);
  }

  changeDestId(event) {
    console.log(event.target.id);
    this.setState({
      destId: event.target.id,
    })
  }

  render() {
    return (
      <div className="trip">
        <Route destinations={this.state.destinations} changeDestId={this.changeDestId} />
        <Map destinations={this.state.destinations} />
      </div>
    );
  }
}

export default Trip;
