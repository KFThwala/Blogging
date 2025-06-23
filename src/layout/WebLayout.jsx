import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function WebLayout() {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export default WebLayout;
