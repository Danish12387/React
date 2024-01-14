import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Details from "../views/Details";
import SingUp from "../views/SingUp";
import Login from "../views/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <SingUp/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/details/:Id",
        element: <Details/>,
    }
]);

function Router() {
    return <RouterProvider router={router} />
}

export default Router;