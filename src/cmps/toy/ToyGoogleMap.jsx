import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const SetBranchLocation = () => (
    <div className="branch-img">
        <img src="src/assets/img/toys-favicon.png" alt="" />
    </div>
)
export function ToyGoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const [zoom, setZoom] = useState(8)

    function handleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    const Haifa = {
        center: {
            lat: 32.820789,
            lng: 34.963488
        }
    }
    const Tel_Aviv = {
        center: {
            lat: 32.071035,
            lng: 34.779118
        }
    }
    const Jerusalem = {
        center: {
            lat: 31.773362,
            lng: 35.221193
        }
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '60vh', width: '100%' }} >
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY }}
                center={coordinates}
                zoom={zoom}
                onClick={handleClick}
            >
                <SetBranchLocation
                    {...Haifa.center}
                />
                <SetBranchLocation
                    {...Tel_Aviv.center}
                />
                <SetBranchLocation
                    {...Jerusalem.center}
                />
            </GoogleMapReact>
        </div >
    )
}