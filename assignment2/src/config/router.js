import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "../views/Dashboard";
import Details from "../views/Details";
import SingUp from "../views/SingUp";
import Login from "../views/Login";
import PostAdd from "../views/PostAdd"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Header from '../component/Navbar'

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
                path: "/dashboard/postAdd",
                element: <PostAdd />,
            },
            {
                path: "/details/:Id",
                element: <Details />,
            }
        ]
    }
]);

function Layout() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        });

    },[])


    useEffect(()=>{
        const path  = window.location.pathname;
        if(user){
            if(path === '/signup' || path === '/login'){
                navigate('/');
            }
        }else {
            if(path === '/' || path === '/details/') {
                navigate('/login');
            }
        }
    },[window.location.pathname, user])

    if(loading) return <h2>Loading...</h2>

    return <div>
        <Header/>
        <Outlet/>
    </div>
}

function Router() {
    return <RouterProvider router={router} />
}

export default Router;