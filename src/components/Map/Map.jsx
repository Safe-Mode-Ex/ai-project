import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCallback, useRef, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './Map.css';
import { RoutingControl } from '../RoutingControl/RoutingControl';
import { customIcon } from './icons';
import { ACADEMY_POSITION, METRO_POSITION } from '../../constants/map';

/**
 * Компонент карты OpenStreetMap с маркером академии
 * Центрирован на адресе: Санкт-Петербург, Набережная реки Карповки, 5л
 * @returns {JSX.Element}
 */
export function Map() {
  const academyMarkerRef = useRef(null);
  const [tileError, setTileError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleTileError = useCallback(() => {
    setTileError(true);
  }, []);

  const handleTileLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  const handleMarkerAdd = useCallback((e) => {
    e.target.openPopup();
  }, []);

  if (tileError) {
    return (
      <Alert severity="error" className="map-error">
        Не удалось загрузить карту, попробуйте позже
      </Alert>
    );
  }

  return (
    <div className="map-container">
      {!mapLoaded && (
        <div className="map-loader">
          <CircularProgress size={48} />
          <span className="map-loader__text">Загрузка карты...</span>
        </div>
      )}
      <MapContainer
        center={ACADEMY_POSITION}
        zoom={16}
        scrollWheelZoom
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            tileerror: handleTileError,
            load: handleTileLoad,
          }}
        />
        <Marker
          ref={academyMarkerRef}
          position={ACADEMY_POSITION}
          icon={customIcon}
          eventHandlers={{
            add: handleMarkerAdd,
          }}
        >
          <Popup>
            <span className="map__tooltip">Привет! Это академия</span>
          </Popup>
        </Marker>

        {/* Маркер станции метро Петроградская */}
        <Marker position={METRO_POSITION} icon={customIcon}>
          <Popup>
            <span className="map__tooltip">Станция метро Петроградская</span>
          </Popup>
        </Marker>

        {/* Пеший маршрут по дорогам */}
        <RoutingControl start={ACADEMY_POSITION} end={METRO_POSITION} />
      </MapContainer>
    </div>
  );
}
