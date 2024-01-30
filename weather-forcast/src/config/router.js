import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import History from '../view/History';
import Dashboard from '../view/Dashboard'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/history",
        element: <History />,
    }
]);


function Router() {
    return <RouterProvider router={router} />
}
    
export default Router;