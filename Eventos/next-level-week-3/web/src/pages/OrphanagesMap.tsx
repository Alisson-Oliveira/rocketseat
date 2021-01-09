import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapIcon from '../utils/mapIcon';
import iconImg from '../images/map-marker.svg';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';

import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={iconImg} alt="Happy"/>
          <h2> Escolha um orfanato no mapa </h2>
          <p> Visite orfanatos e mude o dia de muitas crianças. </p>
        </header>
        <footer>
          <strong> Crato </strong>
          <span> Ceará </span>
        </footer>
      </aside>

      <Map 
        center={[-7.2385434, -39.4209561]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {orphanages.map(orphanage => {
            return (
              <Marker 
                key={orphanage.id}
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
              >
                <Popup 
                  closeButton={false}
                  minWidth={248}
                  maxWidth={248}
                  className="map-popup"
                >
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff"/>
                  </Link>
                </Popup>
              </Marker>
            )
          })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}
 
export default OrphanagesMap;