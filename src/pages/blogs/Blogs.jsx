import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import PostCard from "../../components/common/postCard/PostCard";
import "./Blogs.css";
import SearchBar from "../../components/home/SearchBar/SearchBar";
import SkeletonPostCard from "../../components/common/SkeletonPostCard/SkeletonPostCard";

function Blogs() {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

	// Debounce search input
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setPage(1);
		}, 1000);

		return () => clearTimeout(handler);
	}, [searchQuery]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const res = await API.get(
					`/posts/all?page=${page}&search=${encodeURIComponent(
						debouncedSearch
					)}`
				);
				setPosts(res.data.posts);
				setTotalPages(res.data.totalPages);
			} catch (err) {
				console.error("Failed to fetch posts", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [page, debouncedSearch]);

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	if (loading) {
		return (
			<div className="blogs-container">
				<h2>All Blog Posts</h2>
				<div className="post-grid">
					{Array.from({ length: 6 }).map((_, idx) => (
						<SkeletonPostCard key={idx} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="blogs-page">
			<SearchBar query={searchQuery} onSearch={handleSearch} />

			<div className="blogs-container">
				<h2>All Blog Posts</h2>
				<div className="post-grid">
					{posts.map((post) => (
						<PostCard
							key={post._id}
							post={post}
							onClick={() => navigate(`/post/${post._id}`)}
						/>
					))}
				</div>

				<div className="pagination">
					<button
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						disabled={page === 1}>
						Previous
					</button>
					<span>
						Page {page} of {totalPages}
					</span>
					<button
						onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
						disabled={page === totalPages}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

export default Blogs;
