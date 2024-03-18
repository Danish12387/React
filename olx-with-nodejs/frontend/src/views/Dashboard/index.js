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

  useEffect(() => {
    ft()
  }, [products])

  const ft = async () => {
    const adds = await Axios.post('http://localhost:5000/adds', {
      products
    })
    console.log('from firebase.js', adds);
  }

  async function fetchData() {

    const res = await GetAllProducts();
    SetProducts(res);
    setLoading(false)
  }

  const theme = useSelector(state => state.themeReducer.theme);

  // if (loading) return <h2>Loading...</h2>

  return <div className='dash_baap' style={{ backgroundColor: theme }}>
    {/* <button onClick={fetchData}>click me</button> */}
    <div className="dashboard">
      {products.map((item) => {
        return <Card item={item} />
      })}
    </div>
  </div>
}

export default Dashboard;