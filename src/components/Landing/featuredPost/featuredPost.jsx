import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./featuredPost.css";

function FeaturedPost() {
	const [post, setPost] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await API.get("/posts/most-liked");
				console.log("Most liked post data:", res.data); // Debugging line
				setPost(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchPost();
	}, []);

	if (!post) return null;

	return (
		<section className="featured-section">
			<div
				className="featured-card"
				style={{ backgroundImage: `url(${post.image})` }}
				onClick={() => navigate(`/post/${post._id}`)}>
				<div className="featured-overlay">
					<span className="featured-badge">🔥 Most Liked</span>

					<h2 className="featured-title">{post.title}</h2>

					<p className="featured-excerpt">
						{post.excerpt || post.content?.slice(0, 120) + "..."}
					</p>

					<div className="featured-meta">
						<span>
							<FiHeart /> {post.likes?.length || 0}
						</span>
						<span>
							<FiMessageCircle /> {post.comments?.length || 0}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FeaturedPost;
