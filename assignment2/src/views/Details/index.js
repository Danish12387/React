import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';
import SimpleImageSlider from "react-simple-image-slider"
import { GetSinglePro } from '../../config/firebase';
import { useDispatch } from "react-redux";
import updateCart from '../../store/CartSlice';
import Map, { Marker } from 'react-map-gl';

function Details() {
    const [singleProd, SetSingleProd] = useState();
    const { Id } = useParams();
    const dispatch = useDispatch();
    const [location, setLocation] = useState()

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords
            setLocation({ latitude, longitude })
        })
    }, [])

    async function fetchData() {

        const res = await GetSinglePro(Id);
        SetSingleProd(res);
    }

    const addToCart = () => {
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
        {location && <Map
            mapboxAccessToken=""
            initialViewState={{
                longitude: 24.8511959,
                latitude: 67.0517795,
                zoom: 16
            }}
            style={{ width: 600, height: 400, overflow: 'hidden' }}
            mapStyle="mapbox://styles/muzammil144/ckth155c31as017qfkormprrh"
        >
            {/* <Marker
                draggable={true}
                onDragEnd={e => console.log(e)}
                offsetLeft={-20}
                offsetTop={-10}
                longitude={location.longitude} latitude={location.latitude} anchor="bottom" >
                <p
                        role="img"
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="pin"
                      >
                        📍
                      </p>
            </Marker> */}
        </Map>}

        </div>
    </div>
}

export default Details;
