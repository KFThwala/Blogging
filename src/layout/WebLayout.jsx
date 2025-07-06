import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import { useLocation } from "react-router-dom";

function WebLayout() {
	const location = useLocation();
	const hideLayout = location.pathname === "/create-post";

	return (
		<div className="page-container">
			{!hideLayout && <Header />}
			<main className="content-wrap">
				<Outlet />
			</main>
			{!hideLayout && <Footer />}
		</div>
	);
}

export default WebLayout;
