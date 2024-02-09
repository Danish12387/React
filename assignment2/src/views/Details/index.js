import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';
import SimpleImageSlider from "react-simple-image-slider"
import { GetSinglePro } from '../../config/firebase';
// import { Map, TileLayer } from 'react-leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useDispatch } from "react-redux";
import updateCart from '../../store/CartSlice';

function Details() {
    const [singleProd, SetSingleProd] = useState();
    const { Id } = useParams();
    const dispatch = useDispatch();
    // const[center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    // const ZOOM_LEVEL = 9;


    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {

        const res = await GetSinglePro(Id);
        SetSingleProd(res);
    }

    const addToCart = ()=>{
        dispatch(updateCart(singleProd));
    }

    if (!singleProd) {
        return <h2>loading...</h2>
    }

    const { price, description, images, title } = singleProd;

    return <div className="details">
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
        <div className="map_cont">
            {/* <Map
                center={center}
                zoom={ZOOM_LEVEL}
            >
                <TileLayer url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lLlGrpOl0cSkmV62uHvV"
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            </Map> */}

            <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lLlGrpOl0cSkmV62uHvV"
                />
                {/* <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    </div>
}

export default Details;
