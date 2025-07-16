import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SuggestedPosts.css";
import API from "../../../api/axios";
import SkeletonSuggestedPost from "../../common/SkeletonPostCard/SkeletonPostCard";
import AsidePost from "../../common/AsidePosts/AsidePosts";

function SuggestedPosts() {
	const [suggestedPosts, setSuggestedPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await API.get("/posts/suggested");
				setSuggestedPosts(res.data);
			} catch (err) {
				console.error("Failed to fetch suggested posts", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (!loading && suggestedPosts.length === 0) {
		return (
			<div className="no-suggested">
				<h2 className="suggested-title">Suggested Posts</h2>
				<p className="no-suggested"> 🚫No suggested posts found.</p>;
			</div>
		);
	}

	return (
		<div>
			<h2 className="suggested-title">Suggested Posts</h2>
			<ul className="suggested-list">
				{loading
					? Array.from({ length: 4 }).map((_, i) => (
							<SkeletonSuggestedPost key={i} />
					  ))
					: suggestedPosts.map((post) => (
							<AsidePost key={post._id} post={post} />
					  ))}
			</ul>
		</div>
	);
}

export default SuggestedPosts;
