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
    const [location, setLocation] = useState()

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
        console.log(res);
        setLocation(res.locations);
    }

    if (!singleProd) {
        return <h2>loading...</h2>
    }

    const addToCart = () => {
        dispatch(updateCart(singleProd))
    }

    const { price, description, images, title } = singleProd;

    return <div className="details">

        <div style={{maxWidth: '1274px', minWidth: '1104px', marginLeft: '32px'}}>
            <div className="details_main_div">
                <div style={{ height: '580px', width: '750px'}}>
                    <SimpleImageSlider
                        width={750}
                        height={580}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                        navStyle={2}
                    />
                </div>
                <div className='details_side'>
                    <div className="profile_div">
                        <div className="upper_div">
                            <img src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" />
                            <div className="div_2">
                                <h4>Unknown</h4>
                                <p>Member since Apr 2019</p>
                                <span>See profile <img src="https://static.thenounproject.com/png/551749-200.png" /> </span>
                            </div>
                        </div>
                        <div>
                            <button id="btn_1"><img src="https://tawasal.ae/_next/image?url=%2Fapi%2Fimage-obfuscation%3Furl%3Dcall_b027d02148.png&w=3840&q=75" /> Show phone number</button>
                            <button id="btn_2"><img src="https://www.olx.com.pk/assets/iconChat_noinline.31f5df4a6a21fc770ed6863958662677.svg" /> Chat</button>
                        </div>
                    </div>
                    <div className="location_div">
                        <h2>Location</h2>
                        <span><img src="https://www.iconpacks.net/icons/2/free-location-icon-2952-thumb.png" /> Islamabad Highway, Islamabad</span>
                        {location && <div className="map_cont_details">
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
                        </div>}
                    </div>
                </div>
            </div>
            <div className='details_bottom'>
                <div>
                    <h1>Price: ${price}</h1>
                    <h3 style={{marginTop: "20px"}}>{title}</h3>
                    <span><img src="https://www.iconpacks.net/icons/2/free-location-icon-2952-thumb.png" /> Islamabad Highway, Islamabad</span>
                </div>
                <div>
                    <h2 style={{marginBottom: "10px"}}>Description</h2>
                    <p>{description}</p>
                </div>
                <button onClick={addToCart} className="cart_btn">Add to Cart</button>
            </div>
        </div>

    </div>
}

export default Details;
