import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MAPS_KEY } from "../env";

const fancyMapStyles = require("../../styles/mapStyle.json");

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 33.987, lng: -118.472 }}
      defaultOptions={{ styles: fancyMapStyles }}
    >
      <Marker position={{ lat: 33.987, lng: -118.472 }} />
    </GoogleMap>
  ))
);

class Map extends React.Component {
  render() {
    return (
      <div className="mapContainer">
        <MapWithAMarker
          id="map"
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?key=" + MAPS_KEY
          }
          loadingElement="Loading map..."
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
