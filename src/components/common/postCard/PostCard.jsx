// src/components/common/postCard/PostCard.jsx
import React from "react";
import "./PostCard.css";

function PostCard({ post }) {
	const { title, excerpt, image, author } = post;

	return (
		<article className="post-card">
			{image && (
				<img
					src={image || "https://via.placeholder.com/400x200?text=No+Image"}
					alt={title}
					className="post-image"
				/>
			)}

			<div className="post-content">
				<h3 className="post-title">{title}</h3>
				<p className="post-excerpt">{excerpt}</p>

				<div className="author-info">
					{author?.profileImage ? (
						<img
							src={author.profileImage}
							alt={author.fullName}
							className="author-avatar"
						/>
					) : (
						<div className="author-fallback-avatar">
							{author?.fullName?.[0]?.toUpperCase() || "U"}
						</div>
					)}
					<span className="author-name">{author?.fullName}</span>
				</div>
			</div>
		</article>
	);
}

export default PostCard;
