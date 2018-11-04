import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
export default class Markers extends Component {
  state = {
    isOpen: false,
    infoIndex: null
  };

  showInfo = index =>
    this.setState({
      isOpen: this.state.infoIndex !== index || !this.state.isOpen,
      infoIndex: index
    });

  getPlaceId(index) {
    // console.log(index);
    this.setState({
      isOpen: this.state.infoIndex !== index || !this.state.isOpen,
      infoIndex: index
    });
  }

  render() {
    return this.props.markers
      ? this.props.markers.map(place => {
          return (
            <Marker
              icon={
                this.state.infoIndex === place.id
                  ? `data:image/svg+xml;utf-8, <svg width="50" height="50" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle fill="${100}" opacity="0.75" cx="50%" cy="70%" r="${35}"/></svg>`
                  : null
              }
              onClick={() => {
                this.showInfo(place.id);
              }}
              key={place.id}
              position={{
                lat: place.location.lat,
                lng: place.location.lng
              }}
            >
              {this.state.isOpen &&
                this.state.infoIndex === place.id && (
                  <InfoWindow onCloseClick={this.props.showInfo}>
                    <span>{place.name}</span>
                  </InfoWindow>
                )}
            </Marker>
          );
        })
      : null;
  }
}
