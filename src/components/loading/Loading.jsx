// src/components/Loading.jsx
import React from "react";
import "./Loading.css"; // Import CSS

const Loading = ({ fullScreen = false }) => {
	return (
		<div className={`loader-container ${fullScreen ? "fullscreen" : ""}`}>
			<div className="spinner"></div>
		</div>
	);
};

export default Loading;
