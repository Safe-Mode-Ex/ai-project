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

vi.mock('leaflet', () => ({
  default: {
    icon: () => ({}),
    latLng: () => ({}),
    Routing: {
      control: () => ({
        addTo: () => ({}),
        hide: () => ({}),
        getPlan: () => ({ setWaypoints: () => {} }),
      }),
      osrmv1: () => ({}),
    },
  },
  icon: () => ({}),
  latLng: () => ({}),
  Routing: {
    control: () => ({
      addTo: () => ({}),
      hide: () => ({}),
      getPlan: () => ({ setWaypoints: () => {} }),
    }),
    osrmv1: () => ({}),
  },
}));

vi.mock('leaflet-routing-machine', () => ({}));

vi.mock('leaflet/dist/images/marker-icon.png', () => ({ default: 'marker-icon.png' }));
vi.mock('leaflet/dist/images/marker-shadow.png', () => ({ default: 'marker-shadow.png' }));

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
