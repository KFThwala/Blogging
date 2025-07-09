import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import PostCard from "../../common/postCard/PostCard";
import "./RecentPosts.css";
import SkeletonPostCard from "../../common/SkeletonPostCard/SkeletonPostCard"; // skeleton component
import { Link } from "react-router-dom";

function RecentPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecent = async () => {
			setLoading(true);
			try {
				const res = await API.get("/posts/recent");
				setPosts(res.data);
			} catch (err) {
				console.error("Error loading recent posts", err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecent();
	}, []);

	return (
		<section className="posts-section">
			{loading ? (
				<div className="posts-grid">
					{Array.from({ length: 4 }).map((_, i) => (
						<SkeletonPostCard key={i} />
					))}
				</div>
			) : posts.length === 0 ? (
				<div className="no-posts-msg">
					🚫 No posts yet. Be the first to post!
				</div>
			) : (
				<div className="posts-grid">
					{posts.map((post) => (
						<Link to={`/post/${post._id}`}>
							<PostCard key={post._id} post={post} />
						</Link>
					))}
				</div>
			)}
		</section>
	);
}

export default RecentPosts;
