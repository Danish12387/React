import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Details from "../views/Details";

const router = createBrowserRouter([
    {
        path: "/",
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