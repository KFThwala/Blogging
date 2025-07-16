import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import AsidePost from "../AsidePosts/AsidePosts";
import SkeletonSuggestedPost from "../SkeletonPostCard/SkeletonPostCard";
import "./Trending.css";

function TrendingPosts() {
	const [trendingPosts, setTrendingPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTrending = async () => {
			try {
				const res = await API.get("/posts/trending");
				setTrendingPosts(res.data);
			} catch (err) {
				console.error("Failed to fetch trending posts", err);
			} finally {
				setLoading(false);
			}
		};

		fetchTrending();
	}, []);

	return (
		<div className="right-section">
			<h2 className="trending">🔥Trending</h2>

			{loading ? (
				<ul className="trending-list">
					{Array.from({ length: 3 }).map((_, i) => (
						<SkeletonSuggestedPost key={i} />
					))}
				</ul>
			) : trendingPosts.length > 0 ? (
				<ul className="trending-list">
					{trendingPosts.map((post) => (
						<AsidePost key={post._id} post={post} />
					))}
				</ul>
			) : (
				<p className="no-trending">🚫 No trending posts right now.</p>
			)}
		</div>
	);
}

export default TrendingPosts;
