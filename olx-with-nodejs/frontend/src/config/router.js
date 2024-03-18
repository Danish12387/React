import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import Dashboard from "../views/Dashboard";
import Details from "../views/Details";
import SingUp from "../views/SingUp";
import Login from "../views/Login";
import PostAdd from "../views/PostAdd";
import Header from '../component/Navbar';
import Cart from "../views/Cart";
import Axios from 'axios';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SingUp />,
            },
            {
                path: "/postAdd",
                element: <PostAdd />,
            },
            {
                path: "/details/:Id",
                element: <Details />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ]
    }
]);

function Layout() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const obj = useSelector(state => state.tokenReducer.token);
    const navigate = useNavigate();

    useEffect(() => {
        // onAuthStateChanged(auth, (user)=>{
        //     setUser(user);
        // });
        fetchedData()
        setLoading(false);
    }, [obj.token])

    const fetchedData = async () => {
        try {
            const protecte = await Axios.get('http://localhost:5000/protectedRoute', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${obj.token}`
                }
            });
            setUser(protecte);

            if (protecte?.data?.message == 'Protected') {
                navigate('/'); 
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const path = window.location.pathname;
        if (user?.data?.message == 'Protected') {
            if (path === '/signup' || path === '/login') {
                navigate('/');
            }
        } else {
            if (path === '/' || path === '/details/' || path === '/postAdd') {
                navigate('/login');
            }
        }
    }, [window.location.pathname, user])

    if (loading) return <h2>Loading...</h2>

    return <div>
        <Header />
        <Outlet />
    </div>
}

function Router() {
    return <RouterProvider router={router} />
}

export default Router;