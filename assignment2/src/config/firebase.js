import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2bIySEJktd_uLEyC5HLrPTslF5eYyriM",
  authDomain: "olx-website-288a0.firebaseapp.com",
  projectId: "olx-website-288a0",
  storageBucket: "olx-website-288a0.appspot.com",
  messagingSenderId: "93574521400",
  appId: "1:93574521400:web:f4f04b913c9cae6a30bccd",
  measurementId: "G-MFRGB904CK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app)

let useruid;

// export function GetAllProducts() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://dummyjson.com/products');
//                 const data = await response.json();
//                 setProducts(data.products);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         // Use a separate useEffect for adding data to Firebase
//         const addDataToFirebase = async () => {

//             try {
//                 await addDoc(collection(db, 'Products'), {
//                     id: 1,
//                     title: "iPhone 9",
//                     description: "An apple mobile which is nothing like apple",
//                     price: 549,
//                     discountPercentage: 12.96,
//                     rating: 4.69,
//                     stock: 94,
//                     brand: "Apple",
//                     category: 'smartphones',
//                     thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//                     images: [
//                         "https://cdn.dummyjson.com/product-images/1/1.jpg",
//                         "https://cdn.dummyjson.com/product-images/1/2.jpg",
//                         "https://cdn.dummyjson.com/product-images/1/3.jpg",
//                         "https://cdn.dummyjson.com/product-images/1/4.jpg",
//                         "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//                     ]

//                 });
//             } catch (error) {
//                 console.error('Error adding data to Firebase:', error);
//             }
//         };

//         addDataToFirebase();
//     }, [products]);

//     return (
//         // Your component JSX goes here
//         // You can render the products or display a loading state
//         <div>
//             {/* Render your products here */}
//             {products.map((item) => (
//                 <div key={item.id}>{/* Render individual product */}</div>
//             ))}
//         </div>
//     );
// }



export async function PostAdd(data) {
  const { title, desc, price, img } = data;
  if (!useruid) {
    throw new Error('User not authenticated');
  }

  const userRef = doc(db, 'Posts', useruid);
  await setDoc(userRef, { title, price, desc });

  const profilePhotoRef = ref(storage, `posts/${useruid}`)
  await uploadBytes(profilePhotoRef, img)

  alert('Successfully Posted Add!');
}

export async function Createuser(userInfo) {
  const { email, password, userName } = userInfo
  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { email, userName, password })

  alert('Registered Successfully!')
}

export async function Signin(userInfo) {
  const { email, password } = userInfo
  await signInWithEmailAndPassword(auth, email, password)

  alert('logged In Successfully!')
}


export const onAuthStateChangedHandler = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      useruid = user.uid;
      callback(true, useruid);
    } else {
      useruid = null;
      callback(false, null);
    }
  });
};
