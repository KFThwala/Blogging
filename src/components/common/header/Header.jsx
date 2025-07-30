import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	FiHome,
	FiBookOpen,
	FiInfo,
	FiMail,
	FiLogIn,
	FiUserPlus,
	FiMenu,
	FiX,
} from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../../context/authContext";

import "./Header.css";
import ConfirmModal from "../confirmModal/ConfirmModal";

function Header() {
	const { user, logout } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogoutConfirm = () => {
		logout();
		setShowModal(false);
		navigate("/login");
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<header className="header">
			<div className="header-container">
				<Link to="/" className="logo">
					MyBlog
				</Link>

				{/* Mobile menu button */}
				<button className="mobile-menu-button" onClick={toggleMobileMenu}>
					{mobileMenuOpen ? <FiX /> : <FiMenu />}
				</button>

				{/* Navigation links - both desktop and mobile */}
				<nav className={`links ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
					<NavLink
						to="/home"
						title="Home"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setMobileMenuOpen(false)}>
						<FiHome className="icon" />
						<span>Home</span>
					</NavLink>
					<NavLink
						to="/blogs"
						title="Blogs"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setMobileMenuOpen(false)}>
						<FiBookOpen className="icon" />
						<span>Blogs</span>
					</NavLink>
					<NavLink
						to="/about"
						title="About"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setMobileMenuOpen(false)}>
						<FiInfo className="icon" />
						<span>About</span>
					</NavLink>
					<NavLink
						to="/contact"
						title="Contact"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setMobileMenuOpen(false)}>
						<FiMail className="icon" />
						<span>Contact</span>
					</NavLink>
				</nav>

				{/* Desktop auth links */}
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
								/>
							) : (
								user.fullName?.[0]?.toUpperCase() || "U"
							)}
						</Link>
					</nav>
				)}
			</div>

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
