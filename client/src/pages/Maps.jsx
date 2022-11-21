import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHospitals, reset } from '../features/mapSlice';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "../assets/scss/Home.scss";

function Home() {
  const dispatch = useDispatch()
  const { hospitals } = useSelector((state) => state.map);

  useEffect(() => {
    dispatch(getHospitals());
  }, [dispatch]);
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {
          hospitals ?
            hospitals.length != 0 ? 
              hospitals.map((hospital, i) => (
                <Marker key={i} position={[hospital.lat, hospital.long]}>
                  <Popup>
                    <p>{hospital.title}</p>
                  </Popup>
                </Marker>
              ))
            : null
          : null
        }
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Home;
