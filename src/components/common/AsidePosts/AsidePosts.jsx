import React from "react";
import { Link } from "react-router-dom";

const AsidePost = ({ post }) => {
	return (
		<Link to={`/posts/${post._id}`} className="aside-post">
			<img
				src={post.image || "/default-thumbnail.jpg"}
				alt={post.title}
				className="aside-post-image"
			/>
			<div className="aside-post-info">
				<p className="aside-post-title">{post.title}</p>
				<p className="aside-post-meta">
					By {post.author?.fullName} •{" "}
					{new Date(post.createdAt).toLocaleDateString()}
				</p>
			</div>
		</Link>
	);
};

export default AsidePost;
