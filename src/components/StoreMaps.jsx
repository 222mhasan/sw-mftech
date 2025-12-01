import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";

// Custom marker icon fix for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Example home point
const HOME = [23.780573, 90.279239];

// Example branch markers
const BRANCHES = [
  { name: "Branch 1", pos: [23.777, 90.39] },
  { name: "Branch 2", pos: [23.82, 90.41] },
];

// Example polygon for service zone
const ZONE = [
  [23.78, 90.28],
  [23.79, 90.29],
  [23.78, 90.31],
];

export default function StoreMap() {
  return (
    <div className="w-full h-screen overflow-hidden rounded-xl shadow">
      <MapContainer center={HOME} zoom={11} scrollWheelZoom={true} className="h-full w-full">
        {/* Free OpenStreetMap tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Home Marker */}
        <Marker position={HOME}>
          <Popup>Home Location</Popup>
        </Marker>

        {/* All Branches */}
        {BRANCHES.map((b, i) => (
          <Marker key={i} position={b.pos}>
            <Popup>{b.name}</Popup>
          </Marker>
        ))}

        {/* Polygon — service area */}
        <Polygon positions={ZONE} color="blue" />
      </MapContainer>
    </div>
  );
}
