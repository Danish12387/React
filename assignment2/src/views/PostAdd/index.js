import "./index.css"
import PostAddDiv from '../../component/PostAddDiv'
import { useState } from "react";
import { PostAdd, onAuthStateChangedHandler } from '../../config/firebase';
import { useNavigate } from "react-router-dom";

function Post() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();

  const navigate = useNavigate();

  const addPost = async () => {
    try {
      await onAuthStateChangedHandler(async (isLoggedIn, useruid) => {
        if (isLoggedIn) {
          const data = { title, desc, price };
          await PostAdd(data);
        } else {
          alert('User not authenticated');
          navigate('/');
        }
      });
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="post_main">
      <h2>POST YOUR AD</h2>
      <div className='add'>
        <h3>INCLUDE SOME DETAILS</h3>

        <label>
          <span>Add Title</span>
          <input onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          <span>Description</span>
          <input onChange={(e) => setDesc(e.target.value)} />
        </label>

        <label>
          <span>Price</span>
          <input onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button onClick={addPost}>Add</button>
      </div>

      {/*
      <div className='Post_main_div'>
        <h3>CHOOSE A CATEGORY</h3>
        <div className='Post_second_main'>
          <div className="Post_first_component">
            <PostAddDiv img={"https://www.olx.com.pk/assets/mobiles_noinline.44a7c2eda1ddc22570789a0ccc594747.svg"} span={'Mobile'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/vehicles_noinline.6dc597b67b2291206d31e2a68f8a24af.svg"} span={'Vehicle'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/property-for-sale_noinline.c018c0d0282f22a3c31bb0c42f3c60d7.svg"} span={'Property for sale'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/property-for-rent_noinline.864cf34b8ee4401929a10d17b20e04fe.svg"} span={'Property for Rent'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/business_noinline.0435ec0dc583161da4ab51295bd797d9.svg"} span={'Electronics & Home Appliances'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/bikes_noinline.3fd0a90292fe3789fbb152331b6b98d7.svg"} span={'Bikes'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/business_noinline.0435ec0dc583161da4ab51295bd797d9.svg"} span={'Business, Industrial & Agriculture'} />
            <PostAddDiv img={"https://www.olx.com.pk/assets/services_noinline.45ae56797ea7fef0d10caa5a9781e582.svg"} span={'Services'} />
            <PostAddDiv img={""} span={'Business, Industrial & Agriculture'} />
            <PostAddDiv img={""} span={'Business, Industrial & Agriculture'} />
            <PostAddDiv img={""} span={'Business, Industrial & Agriculture'} />
            <PostAddDiv img={""} span={'Business, Industrial & Agriculture'} />
          </div>
          <div className='Post_second_component'>

          </div>
          <div className='Post_third_component'>

          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Post;