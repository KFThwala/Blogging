import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./PostCard.css";

function PostCard({ post }) {
	const { title, excerpt, image, author, createdAt } = post;

	return (
		<article
			className="post-card"
			style={{
				backgroundImage: `url(${
					image || "https://via.placeholder.com/400x200?text=No+Image"
				})`,
			}}>
			<div className="post-overlay">
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

				<div className="post-timespan">
					{createdAt
						? `${formatDistanceToNow(new Date(createdAt), {
								addSuffix: true,
						  })}`
						: "Unknown date"}
				</div>
			</div>
		</article>
	);
}

export default PostCard;
