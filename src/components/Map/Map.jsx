import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
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
    if (!map) return;

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
          // Сначала скрываем и очищаем маршрут
          controlRef.current.hide();
          if (controlRef.current.getPlan) {
            controlRef.current.getPlan().setWaypoints([]);
          }
          // Затем удаляем с карты
          map.removeControl(controlRef.current);
        } catch {
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
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const academyMarkerRef = useRef(null);

  // Координаты: Санкт-Петербург, Набережная реки Карповки, 5л
  const position = [59.9681, 30.3165];

  // Координаты станции метро Петроградская
  const metroPosition = [59.9664, 30.3115];


  const handleMarkerClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleMarkerAdd = (e) => {
    e.target.openPopup();
  };

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          ref={academyMarkerRef}
          position={position}
          icon={customIcon}
          eventHandlers={{
            add: handleMarkerAdd,
            click: handleMarkerClick,
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
