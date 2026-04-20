import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Map } from './Map';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, className }) => <div data-testid="map-container" className={className}>{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMap: () => ({}),
}));

vi.mock('../RoutingControl/RoutingControl', () => ({
  RoutingControl: () => <div data-testid="routing-control" />,
}));

vi.mock('../../constants/map', () => ({
  ACADEMY_POSITION: [59.9681, 30.3165],
  METRO_POSITION: [59.9664, 30.3115],
}));

vi.mock('./icons', () => ({
  customIcon: {},
}));

vi.mock('leaflet/dist/leaflet.css', () => ({}));
vi.mock('leaflet-routing-machine/dist/leaflet-routing-machine.css', () => ({}));

describe('Map', () => {
  it('renders map container', () => {
    const { container } = render(<Map />);
    expect(container.querySelector('.map-container')).toBeInTheDocument();
  });

  it('displays academy tooltip text', () => {
    render(<Map />);
    expect(screen.getByText('Привет! Это академия')).toBeInTheDocument();
  });

  it('displays metro station tooltip text', () => {
    render(<Map />);
    expect(screen.getByText('Станция метро Петроградская')).toBeInTheDocument();
  });
});
