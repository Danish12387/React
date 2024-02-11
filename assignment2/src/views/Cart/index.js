import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './index.css';

export default function Cart() {
    const [carts, setCart] = useState([]);
    const cart = useSelector(state => state.cartReducer.cart);

    useEffect(() => {
        setCart(cart);
    }, [cart])

    if (!carts) {
        return <h3>There are no items in this cart</h3>
    }
    console.log(carts);
    return (
        <div className='carts_main_div'>
            {carts.map((item) => {
                return <div className='cart_item_div'>
                    <img src={item.thumbnail}/>
                    <div>

                    </div>
                </div>
            })}
        </div>
    )
}