import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RoutingControl } from './RoutingControl';

vi.mock('react-leaflet', () => ({
  useMap: () => ({
    removeControl: vi.fn(),
  }),
}));

vi.mock('leaflet', () => ({
  default: {
    latLng: vi.fn((lat, lng) => ({ lat, lng })),
    Routing: {
      control: vi.fn(() => ({
        addTo: vi.fn(() => ({
          hide: vi.fn(),
          getPlan: vi.fn(() => ({ setWaypoints: vi.fn() })),
          off: vi.fn(),
        })),
      })),
      osrmv1: vi.fn(() => ({})),
    },
  },
}));

vi.mock('leaflet-routing-machine', () => ({}));

describe('RoutingControl', () => {
  it('renders nothing (returns null)', () => {
    const { container } = render(<RoutingControl start={[59.9681, 30.3165]} end={[59.9664, 30.3115]} />);
    expect(container.firstChild).toBeNull();
  });
});
