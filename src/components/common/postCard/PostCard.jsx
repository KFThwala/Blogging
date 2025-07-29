import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./PostCard.css";
import { CiHeart, CiEdit } from "react-icons/ci"; // outlined heart
import { FaHeart } from "react-icons/fa"; // filled heart
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
function PostCard({
	post,
	showActions = false,
	onEdit,
	onDelete,
	currentUserId,
}) {
	const navigate = useNavigate();
	const { title, excerpt, image, author, createdAt, liked } = post;
	const isOwner = currentUserId === author?._id;

	return (
		<article
			className="post-card"
			style={{
				backgroundImage: `url(${
					image || "https://via.placeholder.com/400x200?text=No+Image"
				})`,
			}}>
			<Link to={`/post/${post._id}`} className="post-overlay-link">
				<div className="post-overlay">
					<h3 className="post-title">{title}</h3>
					<p className="post-excerpt">{excerpt}</p>
				</div>
			</Link>

			<div className="post-meta">
				<Link to={`/profile/${author?._id}`} className="author-info">
					{author?.avatar ? (
						<img
							src={author.avatar}
							alt={author.fullName}
							className="author-avatar"
						/>
					) : (
						<div className="author-fallback-avatar">
							{author?.fullName?.[0]?.toUpperCase() || "U"}
						</div>
					)}
					<span className="author-name">{author?.fullName}</span>
				</Link>

				<div className="post-timespan">
					{createdAt
						? `${formatDistanceToNow(new Date(createdAt), {
								addSuffix: true,
								includeSeconds: true,
						  })}`.replace(/^about /, "")
						: "Unknown date"}
				</div>

				<div className="post-interactions">
					<p>
						<span>{post.comments.length}</span>
						<span>💬</span>
					</p>
					<span className="post-likes">
						{post.likes.length}
						{liked ? (
							<FaHeart color="red" size={18} style={{ marginLeft: 4 }} />
						) : (
							<CiHeart color="#fff" size={18} style={{ marginLeft: 4 }} />
						)}
					</span>
				</div>

				{/* 👇 Show edit/delete only for owner and if on profile page */}
				{showActions && isOwner && (
					<div className="post-actions">
						<Button
							label={<CiEdit />}
							onClick={() => navigate(`/post/edit/${post._id}`)}
							className="edit-post-btn"
						/>
						<button
							onClick={() => onDelete(post._id)}
							className="delete-post-btn">
							<MdDeleteOutline />
						</button>
					</div>
				)}
			</div>
		</article>
	);
}

export default PostCard;
