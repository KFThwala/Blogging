import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import "./PostDetails.css";
import ReactMarkdown from "react-markdown";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuth } from "../../context/authContext";
import TrendingPosts from "../../components/common/TrendingPosts/TrendingPosts";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../components/common/LikeButton/LikeButton";
import HomeButton from "../../components/common/homeButton/HomeButton";

function PostDetails() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [liked, setLiked] = useState(false);
	const [animate, setAnimate] = useState(false);

	const [replyText, setReplyText] = useState({});
	const [commentLikes, setCommentLikes] = useState({});
	const navigate = useNavigate();

	const { user } = useAuth();

	const fetchComments = async () => {
		try {
			const res = await API.get(`/comments/${id}`);
			setComments(res.data);
		} catch (err) {
			console.error("Fetch comments error:", err);
		}
	};

	useEffect(() => {
		fetchData();
		fetchComments();
	}, [id]);

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
			setAnimate(true);
			setTimeout(() => setAnimate(false), 300);
		} catch (error) {
			console.error("Like error:", error);
		}
	};

	const handleReplySubmit = async (commentId) => {
		const content = replyText[commentId];
		if (!content?.trim()) return;

		try {
			const res = await API.post(`/comments/reply/${commentId}`, { content });

			setComments((prev) =>
				prev.map((c) =>
					c._id === commentId ? { ...c, replies: [res.data, ...c.replies] } : c
				)
			);

			setReplyText((prev) => ({ ...prev, [commentId]: "" }));
		} catch (err) {
			console.error("Reply error:", err);
		}
	};

	const toggleCommentLike = async (commentId) => {
		try {
			const res = await API.post(`/comments/like/${commentId}`);
			setComments((prev) =>
				prev.map((c) =>
					c._id === commentId ? { ...c, likesCount: res.data.likesCount } : c
				)
			);
			setCommentLikes((prev) => ({
				...prev,
				[commentId]: !prev[commentId],
			}));
		} catch (err) {
			console.error("Like toggle error:", err);
		}
	};
	const deleteComment = async (commentId) => {
		if (!window.confirm("Are you sure you want to delete this comment?"))
			return;

		try {
			await API.delete(`/comments/delete/${commentId}`);
			setComments((prev) => prev.filter((c) => c._id !== commentId));
		} catch (err) {
			console.error("Delete error:", err);
		}
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;

		setSubmitting(true);
		try {
			const res = await API.post(`/comments/create/${id}`, {
				content: commentText,
			});

			setPost((prev) => ({
				...prev,
				comments: [...prev.comments, res.data], // Optional, only if your post model stores comment IDs
			}));

			setCommentText("");
			fetchComments(); // Refresh the comment list after adding
		} catch (err) {
			console.error("Comment error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading || !post) {
		return <div>Loading...</div>;
	}

	console.log("post", post);

	return (
		<>
			<HomeButton />
			<div className="post-details-wrapper">
				<div className="left-section">
					<span className="post-category">
						{post.categories || "No category"}
					</span>
					<h1>{post.title}</h1>

					<div className="post-author-card">
						<div className="post-author-info">
							{post?.author?.avatar ? (
								<img
									src={post.author.avatar}
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
					{/* start here ........................................ */}
					<div className="like-section">
						<button
							onClick={handleLike}
							className={`like-btn ${liked ? "liked" : ""} ${
								animate ? "animate-pop" : ""
							}`}>
							{liked ? "❤️" : "🤍 Like"}
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
						{comments.length === 0 ? (
							<p>No comments yet.</p>
						) : (
							comments.map((comment) => (
								<div key={comment._id} className="comment">
									<div className="comment-header">
										{comment.author?.avatar ? (
											<img
												src={comment.author.avatar}
												alt=""
												className="avatar-sm"
											/>
										) : (
											<div className="avatar-sm-fallback">
												{comment.author?.fullName?.[0]?.toUpperCase() || "U"}
											</div>
										)}
										<strong>{comment.author.fullName}</strong>
									</div>

									<p>{comment.content}</p>

									<div className="comment-actions">
										<LikeButton
											liked={commentLikes[comment._id]}
											onClick={() => toggleCommentLike(comment._id)}
											count={comment.likesCount}
											showCount={true}
										/>
										<button
											className="reply-btn"
											onClick={() =>
												setReplyText((prev) => ({
													...prev,
													[comment._id]:
														prev[comment._id] === undefined ? "" : undefined,
												}))
											}>
											💬 Reply
										</button>

										{(user._id === comment.author._id || user.isAdmin) && (
											<button
												className="delete-btn"
												onClick={() => deleteComment(comment._id)}>
												🗑️ Delete
											</button>
										)}
									</div>

									{/* Reply Form */}
									{replyText[comment._id] !== undefined && (
										<div className="reply-form">
											<textarea
												rows="2"
												placeholder="Write a reply..."
												value={replyText[comment._id]}
												onChange={(e) =>
													setReplyText((prev) => ({
														...prev,
														[comment._id]: e.target.value,
													}))
												}
											/>
											<button
												className="reply-btn"
												onClick={() => handleReplySubmit(comment._id)}>
												Reply
											</button>
										</div>
									)}

									{/* Replies */}
									{comment.replies?.length > 0 && (
										<div className="replies-list">
											{comment.replies.map((reply) => (
												<div key={reply._id} className="reply">
													<strong>{reply.author.fullName}</strong>:{" "}
													{reply.content}
													<p className="likes-count">❤️ {reply.likesCount}</p>
												</div>
											))}
										</div>
									)}
								</div>
							))
						)}
					</div>
				</div>

				<div className="right-section">
					{/* You can add trending posts or sidebar content here */}
					<TrendingPosts />
				</div>
			</div>
		</>
	);
}

export default PostDetails;
