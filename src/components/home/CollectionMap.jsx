import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Helper component to trigger Leaflet map recalculation on window resize
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return null;
}

// Dynamic Custom Leaflet Pin
const createCustomIcon = (name, isAlternateColor = false) => {
  const bgColor = isAlternateColor ? '#c07d18' : '#1b4332';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
        pointer-events: auto;
      ">
        <!-- Pin Icon -->
        <div style="
          background-color: ${bgColor};
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
        ">
          <span style="transform: rotate(45deg); font-size: 11px;">🟢</span>
        </div>
        <!-- Dynamic Zone Name Pill -->
        <div style="
          background-color: white;
          color: #1a1a1a;
          padding: 3px 8px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 11px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          border: 1px solid rgba(0,0,0,0.05);
        ">
          ${name}
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

export default function CollectionMap() {
  const zones = [
    { id: 1, name: 'Isuikwuato', lat: 5.6882, lng: 7.4851, color: 'green' },
    { id: 2, name: 'Aba North Industrial', lat: 5.1221, lng: 7.3712, color: 'brown' },
    { id: 3, name: 'Aba South Central', lat: 5.1066, lng: 7.3667, color: 'green' },
    { id: 4, name: 'Umuahia Main', lat: 5.5260, lng: 7.4895, color: 'green' },
    { id: 5, name: 'Ohafia', lat: 5.6202, lng: 7.8286, color: 'brown' },
    { id: 6, name: 'Arochukwu', lat: 5.3892, lng: 7.9125, color: 'brown' }
  ];

  return (
    <div className="w-full relative rounded-xl overflow-hidden shadow-md border border-gray-100">
      <MapContainer 
        center={[5.45, 7.52]} 
        zoom={9} 
        scrollWheelZoom={false}
        className="h-[350px] sm:h-[450px] md:h-[400px] w-full relative z-0 min-h-[300px]"
      >
        <MapResizeHandler />
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        
        {zones.map((zone) => (
          <Marker
            key={zone.id || zone.name}
            position={[zone.lat, zone.lng]}
            icon={createCustomIcon(zone.name, zone.color === 'brown')}
          />
        ))}
      </MapContainer>
    </div>
  );
}