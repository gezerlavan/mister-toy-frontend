import React, { useEffect, useState } from "react"
import GoogleMapReact from 'google-map-react'
import logoUrl from '../../assets/img/toys-favicon.png'

const SetBranchLocation = () => (
    <div className="branch-img">
        <img src={logoUrl} />
    </div>
)
export function ToyGoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const [zoom, setZoom] = useState(8)

    function handleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    const haifa = {
        center: {
            lat: 32.820789,
            lng: 34.963488
        }
    }
    const tel_aviv = {
        center: {
            lat: 32.071035,
            lng: 34.779118
        }
    }
    const jerusalem = {
        center: {
            lat: 31.773362,
            lng: 35.221193
        }
    }

    return (
        // Important! Always set the container height explicitly
        <div className="google-map" style={{ height: '60vh', width: '60vw' }} >
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY }}
                center={coordinates}
                zoom={zoom}
                onClick={handleClick}
            >
                <SetBranchLocation
                    {...haifa.center}
                />
                <SetBranchLocation
                    {...tel_aviv.center}
                />
                <SetBranchLocation
                    {...jerusalem.center}
                />
            </GoogleMapReact>
            <section className="stores-btns">
                <button onClick={() => { handleClick(haifa.center), setZoom(15) }}>Haifa</button>
                <button onClick={() => { handleClick(tel_aviv.center), setZoom(15) }}>Tel-Aviv</button>
                <button onClick={() => { handleClick(jerusalem.center), setZoom(15) }}>Jerusalem</button>
            </section>
        </div >
    )
}