import { useEffect, useState } from "react";
import { GetAllProducts } from '../../config/firebase';
import { useSelector } from 'react-redux';
import Card from '../../component/Cards';
import './index.css';
import Axios from 'axios';

function Dashboard() {
  const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {

    const res = await GetAllProducts();
    SetProducts(res);
    setLoading(false)
  }

  const theme = useSelector(state => state.themeReducer.theme);

  if (loading) return <h2>Loading...</h2>

  return <div className='dash_baap' style={{ backgroundColor: theme }}>
    <div className="dashboard">
      {products.map((item) => {
        return <Card item={item} />
      })}
    </div>
  </div>
}

export default Dashboard;