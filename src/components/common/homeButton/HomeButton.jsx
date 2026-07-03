// src/components/HomeButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import "./HomeButton.css";

const HomeButton = ({ size = 24, color = "#333", className = "" }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/home"); // or "/" if your home path is root
	};

	return (
		<button onClick={handleClick} className="icon" aria-label="Go to home">
			<IoMdHome size={size} color={color} />
		</button>
	);
};

export default HomeButton;
