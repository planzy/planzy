/* globals fetch */
import React, { Component } from 'react';
import Route from './Route';
import Map from './Map';

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(`/dest/${this.props.key || 2}`)
      .then(res => res.json())
      .then(destinations => this.setState({ destinations }))
      .catch(console.error);
  }

  render() {
    return (
      <div className="trip">
        <Route />
        <Map destinations={this.state.destinations} />
      </div>
    );
  }
}

export default Trip;
