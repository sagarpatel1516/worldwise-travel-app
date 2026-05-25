import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";

import { useCities } from "../contexts/CitiesContext.jsx";
import { useGeolocation } from "../../hooks/useGeoLocation.js";
import { useUrlPosition } from "../../hooks/useUrlPosition.js";

import Button from "./Button.jsx";

function Map() {
  const [mapPosition, setMapPosition] = useState([20, 78]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();

  const [mapLat, mapLng] = useUrlPosition();

  // Move map when URL coordinates change
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  // Move map to user's geolocation
  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[Number(city.position.lat), Number(city.position.lng)]}
            key={city.id}
          >
            <Popup>
              <strong>{city.cityName}</strong>
              <br />
              {city.notes}
            </Popup>
          </Marker>
        ))}

        <ChangeMapPosition position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
}

function ChangeMapPosition({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
}

function DetectMapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      // Fix invalid longitude values
      const fixedLng = ((((lng + 180) % 360) + 360) % 360) - 180;

      navigate(`form?lat=${lat}&lng=${fixedLng}`);
    },
  });

  return null;
}

export default Map;
