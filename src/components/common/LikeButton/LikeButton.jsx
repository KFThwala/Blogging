// src/components/common/LikeButton.jsx
import React, { useState, useEffect } from "react";
import "./LikeButton.css";

const LikeButton = ({ liked, onClick, count, showCount = false }) => {
	const [animate, setAnimate] = useState(false);

	const handleClick = () => {
		onClick();
		setAnimate(true);
	};

	useEffect(() => {
		if (animate) {
			const timer = setTimeout(() => setAnimate(false), 300);
			return () => clearTimeout(timer);
		}
	}, [animate]);

	return (
		<button
			onClick={handleClick}
			className={`like-btn ${liked ? "" : ""} ${animate ? "animate-pop" : ""}`}>
			{liked ? " ❤️" : "🤍Like"}
			{showCount && <span className="show-count">{count}</span>}
		</button>
	);
};

export default LikeButton;
