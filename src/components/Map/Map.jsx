import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import './Map.css';

// Fix for default marker icon in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/**
 * Компонент для построения пешего маршрута по дорогам
 * @param {{start: [number, number], end: [number, number]}} props
 */
function RoutingControl({ start, end }) {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (!map) {
      return;
    }

    controlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      lineOptions: {
        styles: [{ color: '#0066cc', weight: 4, opacity: 0.8 }],
      },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
        profile: 'foot',
      }),
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (controlRef.current) {
        try {
          // Скрываем инструкции
          if (typeof controlRef.current.hide === 'function') {
            controlRef.current.hide();
          }

          // Очищаем waypoints
          if (controlRef.current.getPlan && typeof controlRef.current.getPlan().setWaypoints === 'function') {
            controlRef.current.getPlan().setWaypoints([]);
          }

          // Снимаем обработчики событий
          if (typeof controlRef.current.off === 'function') {
            controlRef.current.off();
          }

          // Удаляем с карты
          if (map && typeof map.removeControl === 'function') {
            map.removeControl(controlRef.current);
          }
        } catch (e) {
          // Игнорируем ошибки при очистке
        }
        controlRef.current = null;
      }
    };
  }, [map, start, end]);

  return null;
}

/**
 * Компонент карты OpenStreetMap с маркером академии
 * Центрирован на адресе: Санкт-Петербург, Набережная реки Карповки, 5л
 * @returns {JSX.Element}
 */
export function Map() {
  const academyMarkerRef = useRef(null);
  const [tileError, setTileError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Координаты: Санкт-Петербург, Набережная реки Карповки, 5л
  const position = [59.9681, 30.3165];

  // Координаты станции метро Петроградская
  const metroPosition = [59.9664, 30.3115];

  const handleTileError = useCallback(() => {
    setTileError(true);
  }, []);

  const handleTileLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  const handlePopupClose = useCallback(() => {
    // Popup closed
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
        center={position}
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
          position={position}
          icon={customIcon}
          eventHandlers={{
            add: handleMarkerAdd,
          }}
        >
          <Popup onClose={handlePopupClose}>
            <span className="map__tooltip">Привет! Это академия</span>
          </Popup>
        </Marker>

        {/* Маркер станции метро Петроградская */}
        <Marker position={metroPosition} icon={customIcon}>
          <Popup>
            <span className="map__tooltip">Станция метро Петроградская</span>
          </Popup>
        </Marker>

        {/* Пеший маршрут по дорогам */}
        <RoutingControl start={position} end={metroPosition} />
      </MapContainer>
    </div>
  );
}
