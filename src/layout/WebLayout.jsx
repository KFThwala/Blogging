import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import { useLocation } from "react-router-dom";

function WebLayout() {
	const location = useLocation();

	// Define paths where layout should be hidden
	const hideLayoutPaths = [
		"/create-post",
		"/post", // Matches /post and /post/*
		"/profile", // Matches /profile and /profile/*
		"/login",
		"/register",
	];

	const shouldHideLayout = hideLayoutPaths.some(
		(path) =>
			location.pathname === path ||
			location.pathname.startsWith(`${path}/`) ||
			location.pathname.startsWith(`${path}-`) // Optional: for paths like /profile-edit
	);

	return (
		<div>
			{!shouldHideLayout && <Header />}

			<main className={`main-content ${shouldHideLayout ? "full-width" : ""}`}>
				<Outlet />
			</main>

			{!shouldHideLayout && <Footer />}
		</div>
	);
}

export default WebLayout;
