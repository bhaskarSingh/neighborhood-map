import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import React from 'react';

const NeighborhoodMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 40.70313886114747, lng: -73.9981049029518 }}
    >
      {props.isMarkerShown &&
        props.markers.map(place => {
          return (
            <Marker
              key={place.id}
              position={{ lat: place.location.lat, lng: place.location.lng }}
            />
          );
        })}
    </GoogleMap>
  ))
);

export default NeighborhoodMap;
