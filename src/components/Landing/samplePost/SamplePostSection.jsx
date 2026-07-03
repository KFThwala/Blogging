import React, { useEffect, useState } from "react";
import {
	FiCalendar,
	FiClock,
	FiHeart,
	FiMessageCircle,
	FiArrowRight,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import "./SamplePostSection.css";
import PostCard from "../../common/postCard/PostCard";

function SamplePostsSection() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecentPosts = async () => {
			try {
				setLoading(true);

				const response = await API.get("/posts/recent?limit=4");

				const postsData = Array.isArray(response.data)
					? response.data
					: response.data.posts || response.data.data || [];

				setPosts(postsData);
				setError("");
			} catch (err) {
				console.error(err);
				setError("Failed to load posts.");
			} finally {
				setLoading(false);
			}
		};

		fetchRecentPosts();
	}, []);

	const formatDate = (date) => {
		if (!date) return "";

		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const calculateReadTime = (content) => {
		if (!content) return "1 min read";

		const words = content.split(/\s+/).length;
		const minutes = Math.ceil(words / 200);

		return `${Math.max(minutes, 1)} min read`;
	};

	const getAuthorName = (author) => {
		if (!author) return "Anonymous";

		return author.fullName || author.name || author.username || "Anonymous";
	};

	const getExcerpt = (post) => {
		if (post.excerpt) return post.excerpt;

		if (!post.content) return "";

		const plain = post.content.replace(/<[^>]*>/g, "");

		return plain.length > 120 ? plain.substring(0, 120) + "..." : plain;
	};

	if (loading) {
		return (
			<section className="sample-posts-section">
				<div className="posts-header">
					<div>
						<h2 className="posts-title">Latest Posts</h2>
					</div>
				</div>

				<div className="posts-grid">
					{[1, 2, 3, 4].map((item) => (
						<div className="post-card skeleton" key={item}>
							<div className="post-image-wrapper">
								<div className="skeleton-image"></div>
							</div>

							<div className="post-content">
								<div className="skeleton-title"></div>
								<div className="skeleton-text"></div>
								<div className="skeleton-text short"></div>
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="sample-posts-section">
				<div className="posts-header">
					<h2 className="posts-title">Latest Posts</h2>
				</div>

				<div className="error-state">
					<p>{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="sample-posts-section">
			<div className="posts-header">
				<div>
					<h2 className="posts-title">Latest Posts</h2>
					<p className="posts-subtitle">Fresh articles from our community.</p>
				</div>

				<Link to="/blogs" className="view-all-btn">
					View All
				</Link>
			</div>

			<div className="posts-grid">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</section>
	);
}

export default SamplePostsSection;
