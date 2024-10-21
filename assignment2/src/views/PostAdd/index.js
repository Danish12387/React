import { useEffect, useState, useRef, useMemo } from "react";
import { PostAdd, onAuthStateChangedHandler } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PostAddDiv from '../../component/PostAddDiv'
import "./index.css"
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';

function Post() {
  const [title, setTitle] = useState();
  const [description, setDesc] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState([]);
  const [stock, setStock] = useState();
  const [thumb, setThumbnail] = useState();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const markerIcon = new L.Icon({
    iconUrl: require("../../location-map-marker-icon-symbol-on-transparent-background-free-png.webp"),
    iconSize: [35, 35],
    popupAnchor: [0, -14]
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      const { latitude, longitude } = location.coords
      setLocation([latitude, longitude])
    })
  }, [])

  function DraggableMarker() {
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setLocation([marker.getLatLng().lat, marker.getLatLng().lng])
          }
        },
      }),
      [],
    )

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={location}
        ref={markerRef}
        icon={markerIcon}
      >
        <Popup minWidth={90}>
          Drag to set location
        </Popup>
      </Marker>
    )
  }

  const addPost = async () => {
    setLoading(true);

    if (!title || !description || !price || !img || !stock || !thumb) {
      throw new Error("All fields must be filled");
    }

    const data = { title, description, price, img, stock, thumb, location };

    try {
      onAuthStateChangedHandler(async (isLoggedIn) => {
        if (isLoggedIn) {
          await PostAdd(data);
          setTitle('')
          setDesc('')
          setPrice('')
          setImg('')
          setStock('')
        } else {
          toast.error('User not authenticated');
          navigate('/');
        }
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="post_main">
      <div className="post_div">
        <h2>POST YOUR ADD</h2>
        <div className='add'>
          <h3>INCLUDE SOME DETAILS</h3>

          <label>
            <span>Add Title: </span>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="text_input" />
          </label>

          <label>
            <span>Description: </span>
            <input onChange={(e) => setDesc(e.target.value)} value={description} type="text" className="text_input" />
          </label>

          <label>
            <span>Price: </span>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="text_input" />
          </label>

          <label>
            <span>Stock: </span>
            <input onChange={(e) => setStock(e.target.value)} value={stock} type="number" className="text_input" />
          </label>

          <span>Thumbnail: </span>
          <label className="img_label">
            <input onChange={(e) => setThumbnail(() => e.target.files[0])} type="file" />
          </label>

          <span>Images: </span>

          <label className="img_label">
            <input onChange={(e) => setImg(() => [...img, e.target.files[0]])} type="file" />
          </label>

          <label className="img_label">
            <input onChange={(e) => setImg(() => [...img, e.target.files[0]])} type="file" />
          </label>

          <label className="img_label">
            <input onChange={(e) => setImg(() => [...img, e.target.files[0]])} type="file" />
          </label>

          <label className="img_label">
            <input onChange={(e) => setImg(() => [...img, e.target.files[0]])} type="file" />
          </label>

          <div className="map_cont">
            <h3>Set Location:</h3>
            {location && <MapContainer
              center={location}
              zoom={13}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=lLlGrpOl0cSkmV62uHvV'
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              />
              <DraggableMarker />

            </MapContainer>}
          </div>


          {
            loading ?
              <button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </button>
              :
              <button onClick={addPost}>
                Post Now
              </button>
          }
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
    </div>
  )
}

export default Post;