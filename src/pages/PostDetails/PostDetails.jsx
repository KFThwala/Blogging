import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import "./PostDetails.css";
import ReactMarkdown from "react-markdown";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuth } from "../../context/authContext";

function PostDetails() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [commentText, setCommentText] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [liked, setLiked] = useState(false);

	const { user } = useAuth();

	const fetchData = async () => {
		try {
			const response = await API.get(`/posts/${id}`);
			setPost(response.data);
			setLiked(response.data.likes.includes(user?._id));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const handleLike = async () => {
		try {
			await API.post(`/posts/${id}/like`);
			setLiked(!liked);
			setPost((prev) => ({
				...prev,
				likes: liked
					? prev.likes.filter((uid) => uid !== user._id)
					: [...prev.likes, user._id],
			}));
		} catch (error) {
			console.error("Like error:", error);
		}
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;

		setSubmitting(true);
		try {
			const res = await API.post(`/posts/${id}/comments`, {
				text: commentText,
			});
			setPost((prev) => ({
				...prev,
				comments: [...prev.comments, res.data],
			}));
			setCommentText("");
		} catch (err) {
			console.error("Comment error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading || !post) {
		return <div>Loading...</div>;
	}

	return (
		<div className="post-details-wrapper">
			<div className="left-section">
				<span className="post-category">
					{post.categories || "No category"}
				</span>
				<h1>{post.title}</h1>

				<div className="post-author-card">
					<div className="post-author-info">
						{post?.author?.profileImage ? (
							<img
								src={post.author.profileImage}
								alt={post.author.fullName}
								className="post-author-avatar"
							/>
						) : (
							<div className="post-author-avatar-fallback">
								{post?.author?.fullName?.[0]?.toUpperCase() || "U"}
							</div>
						)}
						<div className="post-author-meta">
							<p className="post-author-name">{post?.author?.fullName}</p>
							<p className="post-created-time">
								{formatDistanceToNow(new Date(post?.createdAt), {
									addSuffix: true,
								})}
							</p>
						</div>
					</div>

					<div className="post-stats">
						<p>💬 {post?.comments?.length || 0} comments</p>
						<p>❤️ {post?.likes?.length || 0} likes</p>
					</div>
				</div>

				<div className="post-image">
					<img src={post.image} alt={post.title} />
				</div>

				<div className="markdown-body">
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</div>

				{/* Like Button */}
				<div className="like-section">
					<button
						onClick={handleLike}
						className={`like-btn ${liked ? "liked" : ""}`}>
						{liked ? "❤️ Unlike" : "🤍 Like"}
					</button>
				</div>

				{/* Comment Form */}
				<form className="comment-form" onSubmit={handleCommentSubmit}>
					<textarea
						rows="4"
						placeholder="Write a comment..."
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						required></textarea>
					<button type="submit" disabled={submitting}>
						{submitting ? "Posting..." : "Post Comment"}
					</button>
				</form>

				{/* Comment List */}
				<div className="comments-list">
					<h3>Comments</h3>
					{post.comments?.map((comment) => (
						<div key={comment._id} className="comment">
							<p className="comment-author">{comment.author.fullName}</p>
							<p>{comment.text}</p>
						</div>
					))}
				</div>
			</div>

			<div className="right-section">
				<h2 className="trending">Trending</h2>
				{/* You can add trending posts or sidebar content here */}
			</div>
		</div>
	);
}

export default PostDetails;
