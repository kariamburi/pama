import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Link from "next/link";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet library
type CardProps = {
  id: string;
  lat: string;
  lng: string;
  name: string;
  address: string;
  imageUrl: string;
};

const StreetmapOfice = ({
  id,
  name,
  address,
  imageUrl,
  lat,
  lng,
}: CardProps) => {
  const customIcon = L.icon({
    iconUrl: "/assets/icons/pin.png",
    iconSize: [25, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      center={[parseFloat(lat), parseFloat(lng)]}
      zoom={18}
      scrollWheelZoom={false}
      className="map h-[90vh] w-full rounded-lg z-0"
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[parseFloat(lat), parseFloat(lng)]} icon={customIcon}>
        <Popup>
          <div className="gap-1 p-1 w-[150px]">
            <div className="w-16 h-16 bg-gray-100 p-1 rounded-full ">
              <Image
                src={imageUrl}
                alt=""
                className=" w-full h-full object-cover"
                width={400}
                height={400}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold">{name}</div>
              <p>{address}</p>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default StreetmapOfice;
