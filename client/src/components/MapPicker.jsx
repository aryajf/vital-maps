import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import MapCanvas from "../components/MapCanvas"
import userIconUrl from '../assets/Images/user-point.png'

//  Create the Icon
const LeafIcon = L.Icon.extend({
  options: {},
});

const userIcon = new LeafIcon({
  iconUrl: userIconUrl,
  iconSize: [30, 40],
});

function Maps(props) {
  const [slug] = useState(null);
  const [show, setShow] = useState(false);
  const [currentPosition, setCurremPosition] = useState(null);
  const [position, setPosition] = useState(null);
  const handleClose = () => setShow(false);

  const LocationFinderDummy = () => {
    const map = useMapEvents({
        click(e) {
          setPosition(e.latlng)
          if(e.latlng){
            props.onChange(e.latlng)
          }
        },
    })
    return position === null ? null : (
      <Marker position={position} icon={userIcon}>
        <Popup>
          <b>Lokasi yang kamu pilih</b>
        </Popup>
      </Marker>
    );
};

  return (
    <>
      <MapContainer
        style={{ width: props.width + "%", height: '400px' }}
        center={[-6.934266, 107.604904]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationFinderDummy />
        {/* <Legend /> */}
      </MapContainer>
      <MapCanvas handleClose={handleClose} show={show} slug={slug}></MapCanvas>
    </>
  );
}

export default Maps;
