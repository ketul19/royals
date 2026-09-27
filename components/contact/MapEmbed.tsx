'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SiteConfig } from '@/types';

// Fixes the Leaflet icon path issue
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapEmbed({ site }: { site: SiteConfig }) {
  // OpenStreetMap tiles — no API key required. Restyle by changing tile URL.
  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-zinc-800 z-0 relative">
      <MapContainer 
        center={[site.mapCoordinates.lat, site.mapCoordinates.lng]} 
        zoom={15} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[site.mapCoordinates.lat, site.mapCoordinates.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="text-zinc-900 font-medium p-1">
              <p className="mb-2 text-sm">{site.address}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${site.mapCoordinates.lat},${site.mapCoordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-bold text-sm"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
