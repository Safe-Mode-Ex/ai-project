import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

/**
 * Компонент для построения пешего маршрута по дорогам
 * @param {{start: [number, number], end: [number, number]}} props
 */
export function RoutingControl({ start, end }) {
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
