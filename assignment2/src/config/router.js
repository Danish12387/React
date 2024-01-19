import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Details from "../views/Details";
import SingUp from "../views/SingUp";
import Login from "../views/Login";
import PostAddDiv from "../views/PostAdd"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/signup",
        element: <SingUp/>,
    },
    {
        path: "/dashboard/postAdd",
        element: <PostAddDiv/>,
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