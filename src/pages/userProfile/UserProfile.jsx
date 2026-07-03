import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import PostCard from "../../components/common/postCard/PostCard";
import "./UserProfile.css";
import HomeButton from "../../components/common/homeButton/HomeButton";

function UserProfile() {
	const { id } = useParams();

	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [editing, setEditing] = useState(false);

	const [formData, setFormData] = useState({
		fullName: "",
		bio: "",
	});

	useEffect(() => {
		const fetchUserAndPosts = async () => {
			try {
				const [userRes, postsRes] = await Promise.all([
					API.get(`/user/profile/${id}`),
					API.get(`/posts/user/${id}`),
				]);

				setUser(userRes.data);

				setFormData({
					fullName: userRes.data.fullName || "",
					bio: userRes.data.bio || "",
				});

				setPosts(postsRes.data);
			} catch (error) {
				console.error("Failed to fetch profile:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchUserAndPosts();
		}
	}, [id]);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSave = async () => {
		try {
			const res = await API.put(`/user/profile/${id}`, formData);

			setUser(res.data);
			setEditing(false);
		} catch (err) {
			console.error("Failed to update profile:", err);
		}
	};

	const handleCancel = () => {
		setFormData({
			fullName: user.fullName || "",
			bio: user.bio || "",
		});

		setEditing(false);
	};

	if (loading) {
		return <p style={{ textAlign: "center" }}>Loading profile...</p>;
	}

	if (!user) {
		return <p style={{ textAlign: "center" }}>User not found.</p>;
	}
	console.log(editing);
	return (
		<>
			<HomeButton />

			<div className="profile-container">
				<div className="banner">
					<div className="banner-top"></div>

					<div className="banner-bottom">
						<div className="profile-info">
							{editing ? (
								<>
									<input
										type="text"
										name="fullName"
										value={formData.fullName}
										onChange={handleChange}
										placeholder="Full name"
									/>

									<textarea
										name="bio"
										value={formData.bio}
										onChange={handleChange}
										rows={4}
										placeholder="Tell everyone a little about yourself..."
									/>

									<div
										style={{
											display: "flex",
											gap: "10px",
											marginTop: "10px",
										}}>
										<button onClick={handleSave}>Save Profile</button>

										<button
											onClick={handleCancel}
											style={{
												background: "#e5e7eb",
												color: "#111827",
											}}>
											Cancel
										</button>
									</div>
								</>
							) : (
								<>
									<span className="profile-name">{user.fullName}</span>

									<span className="profile-email">{user.email}</span>

									<p className="profile-bio">
										<strong>Bio:</strong> {user.bio || "No bio available."}
									</p>

									<button
										onClick={() => setEditing(true)}
										style={{ marginTop: "10px" }}>
										Edit Profile
									</button>
								</>
							)}
						</div>
					</div>

					<div className="avatar-wrapper">
						{user.avatar ? (
							<img
								className="avatar-img"
								src={user.avatar}
								alt={user.fullName}
							/>
						) : (
							<div className="avatar-fallback">
								{user.fullName?.charAt(0).toUpperCase()}
							</div>
						)}
					</div>
				</div>

				<div className="user-posts-section">
					<h2 className="posts-title">Posts</h2>

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
		</>
	);
}

export default UserProfile;
