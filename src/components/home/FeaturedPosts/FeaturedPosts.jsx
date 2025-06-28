import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import PostCard from "../../common/postCard/PostCard"; // adjust path
import "./FeaturedPosts.css";

function FeaturedPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFeatured = async () => {
			try {
				const res = await API.get("/posts/featured");
				setPosts(res.data);
				setLoading(false);
			} catch (err) {
				console.error("Error loading featured posts", err);
				setError("Failed to load featured posts.");
				setLoading(false);
			}
		};

		fetchFeatured();
	}, []);

	if (loading) return <p>Loading featured posts...</p>;
	if (error) return <p>{error}</p>;

	return (
		<section className="posts-section">
			<h2>Featured Posts</h2>
			<div className="posts-grid">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</section>
	);
}

export default FeaturedPosts;
