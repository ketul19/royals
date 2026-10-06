'use client';

/**
 * MapEmbed — Leaflet map centered on Royal's Inn, Navsari.
 *
 * This component is browser-only (Leaflet requires DOM).
 * It must be imported via next/dynamic with { ssr: false }.
 *
 * Tile layer: CartoDB Dark Matter (no API key required, OpenStreetMap data).
 * Attribution: © OpenStreetMap contributors, © CartoDB
 */

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import siteConfig from '@/data/site.json';

// Fix Leaflet's default marker icon (Webpack breaks asset URLs by default)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom gold marker icon
const goldIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#c9a84c"/>
      <circle cx="12" cy="12" r="6" fill="#0d0d0d"/>
      <text x="12" y="17" text-anchor="middle" font-size="9" font-family="Georgia,serif" fill="#c9a84c" font-weight="bold">R</text>
    </svg>
  `),
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -42],
});

/** Forces Leaflet to re-calculate map size after mount */
function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 100); }, [map]);
  return null;
}

const { lat, lng } = siteConfig.mapCoordinates;
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export default function MapEmbed() {
  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{ height: '400px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        aria-label="Map showing Royal's Inn location in Navsari"
      >
        <InvalidateSizeOnMount />

        {/* Dark tile layer — no API key required */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />

        <Marker position={[lat, lng]} icon={goldIcon}>
          <Popup>
            <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.5', minWidth: '180px' }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>{siteConfig.name}</strong>
              <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '8px' }}>
                {siteConfig.address}
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: '#c9a84c', textDecoration: 'none', fontWeight: 600 }}
              >
                Get Directions ↗
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
