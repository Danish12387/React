import './index.css';
import heart from '../../heart.png';
import { useNavigate } from "react-router-dom";

function Card(props) {
    const navigate = useNavigate();
    const { id, description, thumbnail, price, rating, stock } = props.item

    return <div className="main" onClick={() => navigate(`/details/${id}`)}>
        <img src={thumbnail} className="card_img" />
        <div className='price_div'>
            <h3>Price: ${price}</h3>
            <img src={heart} />
        </div>
        <div className='desc'>
            <p>{description}</p>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Rating: {rating}</p>
            <p>Stock: {stock}</p>
        </div>
    </div>
}

export default Card;