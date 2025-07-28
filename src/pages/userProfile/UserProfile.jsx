import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import PostCard from "../../components/common/postCard/PostCard";
import "./UserProfile.css";

function UserProfile() {
	const { id } = useParams(); // userId from URL
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserAndPosts = async () => {
			try {
				const [userRes, postsRes] = await Promise.all([
					API.get(`/user/profile/${id}`),
					API.get(`/posts/user/${id}`),
				]);

				setUser(userRes.data);
				setPosts(postsRes.data);
			} catch (error) {
				console.error("Failed to fetch profile:", error.message);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchUserAndPosts();
	}, [id]);

	if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
	if (!user) return <p style={{ textAlign: "center" }}>User not found.</p>;

	return (
		<div className="profile-container">
			<div className="banner">
				<div className="banner-top"></div>
				<div className="banner-bottom">
					<div className="profile-info">
						<span className="profile-name">{user.fullName}</span>
						<span className="profile-email">{user.email}</span>
						<p className="profile-bio">
							BIO{user.bio === "" ? ": EMPTY" : ": " + user.bio || ""}
						</p>
					</div>
				</div>
				<div className="avatar-wrapper">
					{user.avatar ? (
						<img className="avatar-img" src={user.avatar} alt={user.fullName} />
					) : (
						<div className="avatar-fallback">
							{user?.fullName?.[0]?.toUpperCase()}
						</div>
					)}
				</div>
			</div>

			<div className="user-posts-section">
				<h2 className="posts-title">POSTS</h2>
				{posts.length === 0 ? (
					<p>No posts yet.</p>
				) : (
					<div className="posts-grid">
						{posts.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default UserProfile;
