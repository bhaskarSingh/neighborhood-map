import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '../config';
import React, { Component } from 'react';
import Markers from './Markers';

class NeighborhoodMap extends Component {
  state = {
    isOpen: false,
    infoIndex: null
  };

  showInfo = index =>
    this.setState({
      isOpen: this.state.infoIndex !== index || !this.state.isOpen,
      infoIndex: index
    });

  render() {
    const GOOGLE_MAPS_API_SCRIPT = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    const Map = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{ lat: 40.70313886114747, lng: -73.9981049029518 }}
        >
          {this.props.isMarkerShown && <Markers markers={this.props.markers} />}
        </GoogleMap>
      ))
    );

    return (
      <Map
        googleMapURL={GOOGLE_MAPS_API_SCRIPT}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default NeighborhoodMap;
