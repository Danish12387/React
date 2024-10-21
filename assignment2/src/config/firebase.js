import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

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
  // const { id, description, thumbnail, price, rating, stock, images, title } = item;
  // await addDoc(collection(db, "Posts"), { id, description, thumbnail, price, rating, stock, images, title });

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
        const photoRef = ref(storage, `posts/${id}/images/${item.name}`);
        await uploadBytes(photoRef, item);

        const downloadUrl = await getDownloadURL(photoRef);
        images.push(downloadUrl);

      })
    );
    const thumbnailRef = ref(storage, `posts/${id}/thumbnail/${thumb.name}`)
    await uploadBytes(thumbnailRef, thumb);

    const downloadUrl2 = await getDownloadURL(thumbnailRef);
    thumbnail = downloadUrl2;

  } catch (e) {
    toast.error(e.message)
  }
  await addDoc(collection(db, "Posts"), { title, price, description, id, images, thumbnail, stock, locations: location });

}

export async function Createuser(userInfo) {
  const { email, password, userName } = userInfo
  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { email, userName, password })

  toast.success('Registered Successfully!')
}

export async function Signin(userInfo) {
  const { email, password } = userInfo
  await signInWithEmailAndPassword(auth, email, password)

  toast.success('Logged In Successfully!')
}

export async function signout() {
  try {
    await signOut(auth);
  }
  catch (e) {
    console.log(e.message);
  }
}

export async function getSingleUser(Id) {
  const docRef = doc(db, "users", Id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: Id }
  }
  else {
    return {}
  }
}

export const onAuthStateChangedHandler = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      id = user.uid;
      callback(true, id, user);
    } else {
      id = null;
      console.log(id);
      callback(false, null);
    }
  });
};
