import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	FiHome,
	FiBookOpen,
	FiInfo,
	FiMail,
	FiLogIn,
	FiUserPlus,
} from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../../context/authContext";

import "./Header.css";
import ConfirmModal from "../confirmModal/ConfirmModal";

function Header() {
	const { user, logout } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const handleLogoutConfirm = () => {
		logout();
		setShowModal(false);
		navigate("/login");
	};

	console.log(user.avatar);

	return (
		<header className="header">
			<Link to="/" className="logo">
				MyBlog
			</Link>

			<nav className="links">
				<NavLink
					to="/home"
					title="Home"
					className={({ isActive }) => (isActive ? "active" : "")}>
					<FiHome className="icon" />
				</NavLink>
				<NavLink
					to="/blogs"
					title="Blogs"
					className={({ isActive }) => (isActive ? "active" : "")}>
					<FiBookOpen className="icon" />
				</NavLink>
				<NavLink
					to="/about"
					title="About"
					className={({ isActive }) => (isActive ? "active" : "")}>
					<FiInfo className="icon" />
				</NavLink>
				<NavLink
					to="/contact"
					title="Contact"
					className={({ isActive }) => (isActive ? "active" : "")}>
					<FiMail className="icon" />
				</NavLink>
			</nav>

			{!user ? (
				<nav className="auth-links">
					<Link to="/login" title="Login">
						<FiLogIn className="icon" />
					</Link>
					<Link to="/register" title="Sign Up">
						<FiUserPlus className="icon" />
					</Link>
				</nav>
			) : (
				<nav className="auth-links">
					<button
						onClick={() => setShowModal(true)}
						title="Logout"
						className="icon-button">
						<IoMdLogOut className="icon" />
					</button>
					<Link to="/profile" className="profile-avatar" title="Profile">
						{user?.avatar ? (
							<img
								src={user.avatar}
								alt={user.fullName || "User avatar"}
								className="avatar-img"
								style={{ width: 32, height: 32, borderRadius: "50%" }}
							/>
						) : (
							user.fullName?.[0]?.toUpperCase() || "U"
						)}
					</Link>
				</nav>
			)}
			<ConfirmModal
				isOpen={showModal}
				onCancel={() => setShowModal(false)}
				onConfirm={handleLogoutConfirm}
				title="Are you sure you want to logout?"
				confirmLabel="Logout"
			/>
		</header>
	);
}

export default Header;
