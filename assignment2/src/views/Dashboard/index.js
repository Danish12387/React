import { useEffect, useState } from "react";
import { GetAllProducts } from '../../config/firebase';
import { useSelector } from 'react-redux';
import Card from '../../component/Cards';
import './index.css';

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

  return <div className='dash_baap'>
    <div className="dash_upper_div">
      <h1>All Categories</h1>
      <div className="images_div">
        <div>
          <img src="https://www.olx.com.pk/assets/mobiles.8c768c96bfde33f18fcf5af2a8b9cf71.png" />
          <h3>Mobile</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/vehicles.29fb808d5118f0db56f68a39ce5392e2.png" />
          <h3>Vehicles</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/property-for-sale.e3a00dbfdaa69fe5f713665f1069502f.png" />
          <h3>Property For Sale</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/property-for-rent.8436595fbaa90d47f0178006f57090a8.png" />
          <h3>Property For Rent</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/electronics-home-appliances.46e034dd8adca44625c2c70e4d1b5984.png" />
          <h3>Electronics & Home Appliances</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/bikes.4dcd02c49b2b83aa5b4d629d1e2b383e.png" />
          <h3>Bikes</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/business-industrial-agriculture.704a6ffb9081bc94b11c102cc613670f.png" />
          <h3>Business Indestrial & Agriculture</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/services.dc6aef196c0403dc61b0ee813f66fa5b.png" />
          <h3>Services</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/jobs.79e6136dda02111cf8e7afe26b9e0f93.png" />
          <h3>Jobs</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/animals.62d396e85f7523dbc8ff23889fdd5c31.png" />
          <h3>Animals</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/furniture-home-decor.66bcf157a53ea4c736a5b0af41219475.png" />
          <h3>Furniture & Home Decor</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/fashion-beauty.dd2cf7638c29b0e5c084a6673dd94dd7.png" />
          <h3>Fashion & Beauty</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/books-sports-hobbies.6fee8d841b332d65a10f050f4a2ee1c8.png" />
          <h3>Books, Sports & Hobbies</h3>
        </div>
        <div>
          <img src="https://www.olx.com.pk/assets/kids.cd8d8864804f1c35dd6a7df68268a48d.png" />
          <h3>Kids</h3>
        </div>
      </div>
    </div>
    <div className="dashboard">
      {products.map((item) => {
        return <Card item={item} />
      })}
    </div>
  </div>
}

export default Dashboard;