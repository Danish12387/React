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
    // fetchData();
    fetchAds();
    
  }, [])

  // useEffect(() => {
  //   ft()
  // }, [products])

  // const ft = async () => {
  //   try {
  //     const adds = await Axios.post('http://localhost:5000/adds', {
  //       products
  //     })

  //     console.log('from firebase.js', adds);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  const fetchAds = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/ads');
      SetProducts(response.data);
      setLoading(false);

    } catch (e) {
      console.error('Error fetching ads:', e.message);
    }
  };

  // async function fetchData() {

  //   const res = await GetAllProducts();
  //   SetProducts(res);
  //   setLoading(false)
  // }

  const theme = useSelector(state => state.themeReducer.theme);

  if (loading) return <h2>Loading...</h2>

  return <div className='dash_baap' style={{ backgroundColor: theme }}>
    {/* <button onClick={ft}>click me</button> */}
    {
      products.length > 0 ?
        <div className="dashboard">
          {products.map((item) => {
            return <Card item={item} />
          })}
        </div>
        :
        <div>There are no items.</div>
    }
  </div>
}

export default Dashboard;