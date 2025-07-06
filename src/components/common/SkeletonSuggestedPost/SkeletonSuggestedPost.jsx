import React from "react";
import "./SkeletonSuggestedPost.css";

function SkeletonSuggestedPost() {
	return (
		<div className="skeleton-suggested-post">
			<div className="skeleton-thumbnail shimmer" />
			<div className="skeleton-text">
				<div className="skeleton-title shimmer" />
				<div className="skeleton-meta shimmer" />
			</div>
		</div>
	);
}

export default SkeletonSuggestedPost;
