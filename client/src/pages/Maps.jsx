import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHospitals } from "../features/mapSlice";
import hospitalIconUrl from '../assets/Images/maps-point.png'
import userIconUrl from '../assets/Images/user-point.png'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import * as L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
// import "../assets/scss/Home.scss"
import MapCanvas from "../components/MapCanvas";
// import Legend from "../components/Legend";

//  Create the Icon
const LeafIcon = L.Icon.extend({
  options: {},
});

const hospitalIcon = new LeafIcon({
    iconUrl: hospitalIconUrl,
    iconSize: [30, 50],
  }),
  userIcon = new LeafIcon({
    iconUrl: userIconUrl,
    iconSize: [30, 40],
  });

function Maps(props) {
  const [slug, setSlug] = useState(null);
  const [position, setPosition] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { hospitals } = useSelector((state) => state.map);

  useEffect(() => {
    dispatch(getHospitals());
  }, [dispatch]);

  function changeSlug(detailSlug) {
    setSlug(detailSlug);
  }

  function LocationMarker() {
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        if (props.width) {
          map.flyTo(e.latlng, map.getZoom());
        }
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={userIcon}>
        <Popup>
          <b>Lokasi Kamu</b>
        </Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
        style={{ width: props.width + "px" }}
        center={[-6.934266, 107.604904]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {hospitals
            ? hospitals.length != 0
              ? hospitals.map((hospital, i) => (
                  <Marker
                    key={i}
                    position={[hospital.lat, hospital.long]}
                    eventHandlers={{
                      click: () => {
                        changeSlug(hospital.slug);
                        handleShow();
                      },
                    }}
                    icon={hospitalIcon}
                  ></Marker>
                ))
              : null
            : null}
        </MarkerClusterGroup>
        <LocationMarker />
        {/* <Legend /> */}
      </MapContainer>
      <MapCanvas handleClose={handleClose} show={show} slug={slug}></MapCanvas>
    </>
  );
}

export default Maps;
