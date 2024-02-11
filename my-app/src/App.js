import { useState, useEffect, useMemo, useRef } from 'react';
import { statesData } from './data';
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

function App() {
  const center = [24.843997426654372, 67.04918729144546];
  const [location, setLocation] = useState()

  const markerIcon = new L.Icon({
    iconUrl: require("./location-map-marker-icon-symbol-on-transparent-background-free-png.webp"),
    iconSize: [35, 35],
    popupAnchor: [0, -14]
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      const { latitude, longitude } = location.coords
      setLocation([latitude, longitude])
    })
  }, [])

  if (!location) {
    return <h2>Loading...</h2>
  }

  function DraggableMarker() {
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setLocation(marker.getLatLng())
          }
        },
      }),
      [],
    )

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={location}
        ref={markerRef}
        icon={markerIcon}
        >
        <Popup minWidth={90}>
          Location Locked
        </Popup>
      </Marker>
    )
  }

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=lLlGrpOl0cSkmV62uHvV'
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <DraggableMarker />

      {/* {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          return <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: '#D45962',
                  fillOpacity: 0.7,
                  weight: 5,
                  dashArray: 3,
                  color: '#666'
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: 3,
                  color: 'white'
                })
              },
              click: (e) => {

              },
              drag: (e) => {
                console.log(e);
              }
            }}
          />
        })
      } */}
    </MapContainer>
  );
}

export default App;
