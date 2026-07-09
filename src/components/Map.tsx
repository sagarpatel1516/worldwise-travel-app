import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import Button from "./Button";

import styles from "./Map.module.css";

function Map(): React.JSX.Element {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([20, 78]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

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
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
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

interface ChangeMapPositionProps {
  position: LatLngExpression;
}

function ChangeMapPosition({ position }: ChangeMapPositionProps): null {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

function DetectMapClick(): null {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      const fixedLng = ((((lng + 180) % 360) + 360) % 360) - 180;

      navigate(`form?lat=${lat}&lng=${fixedLng}`);
    },
  });

  return null;
}

export default Map;
