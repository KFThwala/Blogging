import { RouterProvider } from "react-router-dom";
import router from "./router/router";

import React from "react";

function App() {
	return <RouterProvider router={router} />;
}

export default App;
