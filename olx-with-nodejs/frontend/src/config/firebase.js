import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Axios from 'axios';

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
export const auth = getAuth();
const storage = getStorage(app)

let id;

export async function GetAllProducts() {
  const querySnapshot = await getDocs(collection(db, "Posts"));
  const pro = [];
  querySnapshot.forEach((doc) => {
    pro.push({ uid: doc.id, ...doc.data() })
  })

  return pro;
}

export async function GetSinglePro(Id) {

  const docRef = doc(db, "Posts", Id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: Id }
  }
  else {
    return {}
  }
}

export async function PostAdd(data) {
  const { title, description, price, img, thumb, stock, location } = data;
  if (!id) {
    throw new Error('User not authenticated');
  }

  const images = [];
  let thumbnail;

  try {
    await Promise.all(
      img.map(async (item) => {
        const profilePhotoRef = ref(storage, `posts/${id}/images/${item.name}`)
        await uploadBytes(profilePhotoRef, item);

        const downloadUrl = await getDownloadURL(profilePhotoRef);
        images.push(downloadUrl);

      })
    );
    const thumbnailRef = ref(storage, `posts/${id}/thumbnail/${thumb.name}`)
    await uploadBytes(thumbnailRef, thumb);

    const downloadUrl2 = await getDownloadURL(thumbnailRef);
    thumbnail = downloadUrl2;

  } catch (e) {
    alert(e.message)
  }

  try {
    const adds = await Axios.post('http://localhost:5000/adds', {
      title: title,
      description: description,
      price: price,
      id: id,
      images: images,
      thumbnail: thumbnail,
      stock: stock,
      locations: location
    })

    alert(adds.data.message);

  }
  catch (e) {
    console.log(e);
  }

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

export const onAuthStateChangedHandler = (callback, obj) => {
  return fetchedData(callback, obj)
};

const fetchedData = async (callback, obj) => {
  try {
    const protecte = await Axios.get('http://localhost:5000/protectedRoute', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${obj.token}`
      }
    });

    if (protecte.data.message == 'Protected') {
      id = protecte.data.uid;
      callback(true, id);

    } else {
      id = null;
      callback(false, null);
    }
  }
  catch (e) {
    console.log('from firebase try catch', e);
  }
}
