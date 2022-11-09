// import React from 'react';
// import GoogleMapReact from 'google-map-react';

// const Marker = ({ text }) => <div className='pin'></div>;

// export default function MapLocations({ details }) {
//   const defaultProps = {
//     center: {
//       lat: details.coordinates.latitude,
//       lng: details.coordinates.longitude,
//     },
//     zoom: 15,
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyDotiMJsHkIxEKGb2It95eY666clgy91dI' }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <Marker
//           lat={details.coordinates.latitude}
//           lng={details.coordinates.longitude}
//           // text='My Marker'
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1500px',
  height: '1000px',
  textAlign: "center",
  justifyContent: 'center'
};

const onLoad = (marker) => {
  console.log('marker: ', marker);
};

const MapLocations = ({ details }) => {
  const position = {
    lat: details.coordinates.latitude,
    lng: details.coordinates.longitude,
  };

  console.log(details);

  return (
    <LoadScript googleMapsApiKey='AIzaSyDotiMJsHkIxEKGb2It95eY666clgy91dI'>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
        <>
          <Marker onLoad={onLoad} position={position} />
        </>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapLocations;
