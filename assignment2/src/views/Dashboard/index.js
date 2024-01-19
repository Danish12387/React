import './index.css';
import { useEffect, useState } from "react";
import Card from '../../component/Cards';
import { onAuthStateChangedHandler } from '../../config/firebase';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => SetProducts(res.products));
  }, [])

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler((isLoggedIn, uid) => {
      if (!isLoggedIn) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  return <div className="dashboard">
    {products.map((item) => {
      return <Card item={item} />
    })}
  </div>
}

export default Dashboard;