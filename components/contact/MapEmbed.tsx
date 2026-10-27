'use client';

/**
 * MapEmbed — Leaflet map centered on Royal's Inn, Navsari.
 *
 * This component is browser-only (Leaflet requires DOM).
 * It must be imported via next/dynamic with { ssr: false }.
 *
 * Tile layers (100% Free, NO API KEY, ZERO WATERMARKS):
 *  - Dark theme:  Esri World Dark Gray Canvas
 *  - Light theme: Esri World Light Gray Canvas
 *  Attribution: © Esri, HERE, Garmin, © OpenStreetMap contributors
 *
 * Bug #5 fix: outer div uses CSS isolation: isolate to create a new stacking
 * context that traps Leaflet's internal z-indexes (200–700) inside the map
 * container, preventing them from appearing above the FloatingActionStack.
 */

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import siteConfig from '@/data/site.json';
import { useTheme } from '@/contexts/ThemeContext';

// Fix Leaflet's default marker icon (Webpack breaks asset URLs by default)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ── Theme-aware, zero-watermark, free tile layer URLs ──────────────────────────
// Esri ArcGIS Canvas tiles provide clean, un-watermarked, luxury cartography
// with zero API keys required.
const TILES = {
  dark:  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  light: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
};

// ── Theme-aware custom gold marker icon ──────────────────────────────────────
/**
 * Returns a marker SVG whose inner circle fill adapts to the current theme.
 * Dark theme: dark circle (#0d0d0d) inside gold pin.
 * Light theme: ivory circle (#faf8f4) inside gold pin — stays legible.
 */
function buildGoldIcon(isDark: boolean) {
  const innerFill = isDark ? '#0d0d0d' : '#faf8f4';
  return new L.Icon({
    iconUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#c9a84c"/>
          <circle cx="12" cy="12" r="6" fill="${innerFill}"/>
          <text x="12" y="17" text-anchor="middle" font-size="9" font-family="Georgia,serif" fill="#c9a84c" font-weight="bold">R</text>
        </svg>
      `),
    iconSize: [28, 42],
    iconAnchor: [14, 42],
    popupAnchor: [0, -42],
  });
}

/** Forces Leaflet to re-calculate map size after mount */
function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 100); }, [map]);
  return null;
}

const { lat, lng } = siteConfig.mapCoordinates;
// Use the clean short URL from site.json for the directions link
const mapsUrl = siteConfig.googleMapsUrl;

export default function MapEmbed() {
  const { theme, mounted } = useTheme();
  // Safe default to dark before client mounts
  const isDark = !mounted || theme === 'dark';
  const tileUrl = isDark ? TILES.dark : TILES.light;
  const goldIcon = buildGoldIcon(isDark);

  return (
    /*
     * Bug #5 fix: isolation: 'isolate' creates a new CSS stacking context
     * that traps Leaflet's internal z-indexes (panes: 200, 400, 600, 700)
     * inside this element — they can no longer compete with elements outside
     * (e.g. FloatingActionStack at z-[60]).
     */
    <div
      className="overflow-hidden rounded-lg"
      style={{
        height: '400px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        isolation: 'isolate',
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        aria-label="Map showing Royal's Inn location in Navsari"
      >
        <InvalidateSizeOnMount />

        {/* Clean, zero-watermark, theme-aware tile layer */}
        <TileLayer
          key={tileUrl}
          url={tileUrl}
          attribution='&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={16}
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
