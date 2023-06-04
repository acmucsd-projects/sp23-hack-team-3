import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './map.css'
import eventData from "../event-data.json";

const Marker = ({ text }) => (
    <div className="pin">
        <Icon icon={locationIcon} style={{ color: 'red', position: 'absolute', translateZ: 0, transform: 'translate(-50%, -100%)' }} height="30" className="pin-icon" />
        <span className="pin-text">{text}</span>
    </div>
)

const Map = ({ center, zoomLevel, latlngData}) => (
    <div className="map">
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyADMskMzEIq3kf83pKEnGXCun4s36ugpJU' }}
                defaultCenter={center}
                defaultZoom={zoomLevel}
            >
                {
                    latlngData.map(e =>
                        <Marker
                            lat={e.lat}
                            lng={e.lng}
                            text={e.name}
                        />)
                }
            </GoogleMapReact>
        </div>
    </div>
)

export default Map