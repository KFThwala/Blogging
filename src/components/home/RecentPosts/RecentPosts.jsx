import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import PostCard from "../../common/postCard/PostCard"; // adjust path
import "./RecentPosts.css";

function RecentPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchRecent = async () => {
			try {
				const res = await API.get("/posts/recent");
				console.log(res.data);
				setPosts(res.data);
			} catch (err) {
				console.error("Error loading recent posts", err);
			}
		};

		fetchRecent();
	}, []);

	return (
		<section className="posts-section">
			<div className="posts-grid">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</section>
	);
}

export default RecentPosts;
