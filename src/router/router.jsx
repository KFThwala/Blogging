import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Signup from "../pages/authentication/signup/Signup";
import Login from "../pages/authentication/login/Login";
import WebLayout from "../layout/WebLayout";
import ProtectedRoute from "./protectRoute";
import Home from "../pages/home/Home";

const ProtectedLayout = () => (
	<ProtectedRoute>
		<WebLayout />
	</ProtectedRoute>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Signup />,
	},
	{
		element: <ProtectedLayout />,

		children: [
			{
				path: "/home",
				element: <Home />,
			},
		],
	},
]);

export default router;
