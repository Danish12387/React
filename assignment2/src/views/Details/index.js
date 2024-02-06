import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';
import SimpleImageSlider from "react-simple-image-slider"
import { GetSinglePro } from '../../config/firebase';

function Details() {
    const [singleProd, SetSingleProd] = useState();
    const { Id } = useParams();

    // useEffect(() => {
    //     fetch(`https://dummyjson.com/products/${Id}`)
    //         .then(res => res.json())
    //         .then(res => SetSingleProd(res));
    // }, [])

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {

        const res = await GetSinglePro(Id);
        // console.log(res);
        SetSingleProd(res);
    }

    if (!singleProd) {
        return <h2>loading...</h2>
    }

    const { price, description, images, title } = singleProd;

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
            <h3>{title}</h3>
            <h1>Price: ${price}</h1>
            <div>
                <h3>Description</h3>
                <p>{description}</p>
            </div>
        </div>
    </div>
}

export default Details;