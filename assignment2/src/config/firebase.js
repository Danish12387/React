import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyC2bIySEJktd_uLEyC5HLrPTslF5eYyriM",
    authDomain: "olx-website-288a0.firebaseapp.com",
    projectId: "olx-website-288a0",
    storageBucket: "olx-website-288a0.appspot.com",
    messagingSenderId: "93574521400",
    appId: "1:93574521400:web:f4f04b913c9cae6a30bccd",
    measurementId: "G-MFRGB904CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export function GetAllProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Use a separate useEffect for adding data to Firebase
        const addDataToFirebase = async () => {

            try {
                await addDoc(collection(db, 'Products'), {
                    id: 1,
                    title: "iPhone 9",
                    description: "An apple mobile which is nothing like apple",
                    price: 549,
                    discountPercentage: 12.96,
                    rating: 4.69,
                    stock: 94,
                    brand: "Apple",
                    category: 'smartphones',
                    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
                    images: [
                        "https://cdn.dummyjson.com/product-images/1/1.jpg",
                        "https://cdn.dummyjson.com/product-images/1/2.jpg",
                        "https://cdn.dummyjson.com/product-images/1/3.jpg",
                        "https://cdn.dummyjson.com/product-images/1/4.jpg",
                        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
                    ]

                });
            } catch (error) {
                console.error('Error adding data to Firebase:', error);
            }
        };

        addDataToFirebase();
    }, [products]);

    return (
        // Your component JSX goes here
        // You can render the products or display a loading state
        <div>
            {/* Render your products here */}
            {products.map((item) => (
                <div key={item.id}>{/* Render individual product */}</div>
            ))}
        </div>
    );
}

export function Createuser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
}

export function onAuth() {

    onAuthStateChanged(auth, (user) => {
        const navigate = useNavigate();
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...
        } else {
            navigate('signup')
            alert('sign In')
        }
    });
}