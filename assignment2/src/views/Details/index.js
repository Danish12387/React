import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';
import SimpleImageSlider from "react-simple-image-slider"

function Details() {
    const [singleProd, SetSingleProd] = useState();
    const { Id } = useParams();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${Id}`)
            .then(res => res.json())
            .then(res => SetSingleProd(res));
    }, [])

    if (!singleProd) {
        return <div>loading...</div>
    }

    const { price, description, images } = singleProd;

    return <div className="details">
        <div style={{height: '500px', width:'600px'}}>
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
            <h1>Price: ${price}</h1>
            <div>
                <h3>Description</h3>
                <p>{description}</p>
            </div>
        </div>
    </div>
}

export default Details;