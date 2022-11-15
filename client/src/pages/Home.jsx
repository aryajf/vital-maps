import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import '../assets/scss/Home.scss';
import Content from '../components/Content';
import '../assets/scss/Content.scss';

function Home() {
  return (
    <section className="Welcome">
      <Content />
    </section>
  );
}

export default Home;
