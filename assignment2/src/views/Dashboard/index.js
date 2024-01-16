import { useEffect, useState } from "react";
import Card from '../../component/Cards';
import './index.css';
import { onAuth } from '../../config/firebase';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => SetProducts(res.products));
  }, [])

  const navigate = useNavigate();

  const onauth = async () => {
    try {
      await onAuth()
      navigate('/dashboard')
    } catch (e) {
      alert(e.message)
    }
  }

  // useEffect(() => {
  //   onauth()
  // }, [])

  return <div className="dashboard">
    {products.map((item) => {
      return <Card item={item} />
    })}
  </div>
}

export default Dashboard;