import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MAPS_KEY } from '../env';

const fancyMapStyles = require('../../styles/mapStyle.json');

const MapWithMarkers = withScriptjs(withGoogleMap(({ destinations }) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 33.987, lng: -118.472 }}
    defaultOptions={{ styles: fancyMapStyles }}
  >
    {destinations && destinations.map(dest => (
      <Marker
        key={dest.id}
        position={{ lat: dest.lat, lng: dest.lon }}
      />
    ))}
  </GoogleMap>
)));

const Map = ({ destinations }) => (
  <div className="mapContainer">
    <MapWithMarkers
      id="map"
      googleMapURL={
        `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}`
      }
      destinations={destinations}
      loadingElement="Loading map..."
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  </div>
);

export default Map;
