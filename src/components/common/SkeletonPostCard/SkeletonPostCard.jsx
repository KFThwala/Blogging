import React from "react";
import "./SkeletonPostCard.css";

function SkeletonPostCard() {
	return (
		<div className="skeleton-card">
			<div className="skeleton-image shimmer"></div>
			<div className="skeleton-content">
				<div className="skeleton-title shimmer"></div>
				<div className="skeleton-excerpt shimmer"></div>
				<div className="skeleton-author shimmer"></div>
			</div>
		</div>
	);
}

export default SkeletonPostCard;
