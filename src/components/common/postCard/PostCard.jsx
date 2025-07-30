import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./PostCard.css";
import { CiHeart, CiEdit } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
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
			className={`post-card ${showActions ? "show-actions" : ""}`}
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
				<div className="post-meta-left">
					<div>
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
					</div>

					<div className="post-timespan">
						{createdAt
							? `${formatDistanceToNow(new Date(createdAt), {
									addSuffix: true,
									includeSeconds: true,
							  })}`.replace(/^about /, "")
							: "Unknown date"}
					</div>

					<div className="post-interactions">
						<p className="post-comments">
							<span>
								<FaRegComment />
							</span>
							<span>{post.comments.length}</span>
						</p>
						<p className="post-likes">
							<span>
								<CiHeart color="red" size={12} style={{ marginLeft: 2 }} />
							</span>
							<span>{post.likes.length}</span>
						</p>
					</div>
				</div>

				{isOwner && (
					<div className="post-actions">
						<button
							onClick={(e) => {
								e.preventDefault();
								navigate(`/post/edit/${post._id}`);
							}}
							className="edit-post-btn">
							<CiEdit size={18} />
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								onDelete(post._id);
							}}
							className="delete-post-btn">
							<MdDeleteOutline size={18} />
						</button>
					</div>
				)}
			</div>
		</article>
	);
}

export default PostCard;
