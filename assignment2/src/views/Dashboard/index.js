import './index.css';
import { useEffect, useState } from "react";
import Card from '../../component/Cards';
import { GetAllProducts } from '../../config/firebase';
import { useSelector } from 'react-redux'; 

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


  // function click() {
  //   products.map(async (item) => {
  //     try {
  //       await GetAllProducts(item);
  //     } catch (e) {
  //       alert(e.message);
  //     }

  //     return <Card item={item} />
  //   })
  // }

  const theme = useSelector(state => state.theme);

  if (loading) return <h2>Loading...</h2>

  return <div className='dash_baap'  style={{backgroundColor: theme}}>
    {/* <button onClick={click}>
      click me
    </button> */}
    <div className="dashboard">
      {products.map((item) => {
        return <Card item={item} />
      })}
    </div>
  </div>
}

export default Dashboard;