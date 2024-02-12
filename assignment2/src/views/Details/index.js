import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSinglePro } from '../../config/firebase';
import { useDispatch } from "react-redux";
import { updateCart } from '../../store/cartSlice';
import SimpleImageSlider from "react-simple-image-slider"
import React from 'react';
import './index.css';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Details() {
    const [singleProd, setSingleProd] = useState();
    const { Id } = useParams();
    const dispatch = useDispatch();
    const [location, setLocation] = useState([24.887276379066083, 67.00768745849048])

    const markerIcon = new L.Icon({
        iconUrl: require("../../location-map-marker-icon-symbol-on-transparent-background-free-png.webp"),
        iconSize: [35, 35],
        popupAnchor: [0, -14]
    })

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {

        const res = await GetSinglePro(Id);
        setSingleProd(res);
    }

    if (!singleProd) {
        return <h2>loading...</h2>
    }

    const addToCart = () => {
        dispatch(updateCart(singleProd))
    }

    const { price, description, images, title } = singleProd;

    return <div className="details">
        <div className="details_main_div">
            <div style={{ height: '500px', width: '600px' }}>
                <SimpleImageSlider
                    width={600}
                    height={500}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    navStyle={2}
                />
            </div>
            <div className='details_side'>
                <h3>{title}</h3>
                <h1>Price: ${price}</h1>
                <div>
                    <h3>Description</h3>
                    <p>{description}</p>
                </div>
                <button onClick={addToCart} className="cart_btn">Add to Cart</button>
            </div>
        </div>

        <div className="map_cont">
            <MapContainer
                center={location}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=lLlGrpOl0cSkmV62uHvV'
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                <Marker
                    draggable={false}
                    position={location}
                    icon={markerIcon}
                >
                    <Popup minWidth={90}>
                        Location Locked
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    </div>
}

export default Details;
