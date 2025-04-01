import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { RoutesPathName } from "./constants";
import PrivateRoute from "./utils/PrivateRoute";
import AccountPage from "./pages/AccountPage";
import LandingPage from "./pages/LandingPage";
import ChangePassword from "./pages/ChangePassword";
import NotFoundPage from "./pages/NotFoundPage";

const routes = createBrowserRouter([
  {
    path: RoutesPathName.SIGNUP_PAGE,
    Component: Register,
  },
  {
    path: RoutesPathName.LOGIN_PAGE,
    element: <Login />,
  },
  {
    path: RoutesPathName.CHANGE_PASSWORD,
    element: <ChangePassword />,
  },
  {
    path: RoutesPathName.ACCOUNT,
    element: <AccountPage />,
  },
  {
    path: RoutesPathName.DASHBOARD_PAGE,
    element: <PrivateRoute />,
  },
  {
    path:RoutesPathName.LANDING_PAGE,
    element :<LandingPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
