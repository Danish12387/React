import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { removeFromCart } from '../../store/cartSlice';
import './index.css';

export default function Cart() {
    const [carts, setCart] = useState([]);
    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        setCart(cart);
    }, [cart])
    
    const removeCart = (id) => {
        dispatch(removeFromCart(id));
    }

    if (!carts.length) {
        return <h3>There are no items in this cart.</h3>
    }

    return (
        <div className='carts_main_div'>
            {carts.map((item) => {
                const { id, description, thumbnail, price, rating, stock, title } = item
                return <div className='cart_item_div'>
                    <img src={thumbnail} />
                    <div className='title_desc_div'>
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <p style={{ color: 'rgb(75, 75, 75)', fontSize: '13px' }}>Stock: {stock}</p>
                    </div>
                    <div className='cart_price_div'>
                        <span>Price: ${price}</span>
                    </div>
                    <div className='cart_img'>
                        <img onClick={() => removeCart(id)} src='https://static-00.iconduck.com/assets.00/delete-icon-2048x1991-ncxytfv2.png' />
                    </div>
                </div>
            })}
        </div>
    )
}