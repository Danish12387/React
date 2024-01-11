import { useEffect, useState } from "react";
import Card from '../../component/Cards';
import './index.css';

function Dashboard() {
    const [products, SetProducts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(res => SetProducts(res.products));
    }, [])

    return <div className="dashboard">
        {products.map((item) => {
            return <Card item={item} />
        })}
    </div>
}

export default Dashboard;