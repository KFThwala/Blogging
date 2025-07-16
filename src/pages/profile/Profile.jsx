import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import API from "../../api/axios";
import PostCard from "../../components/common/postCard/PostCard";
import Button from "../../components/common/button/Button";
import "./Profile.css";

function Profile() {
	const { user, token } = useAuth();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);

	const [fullNameInput, setFullNameInput] = useState(user?.fullName || "");
	const [avatarInput, setAvatarInput] = useState(user?.avatar || "");
	const [bioInput, setBioInput] = useState(user?.bio || "");

	useEffect(() => {
		const fetchMyPosts = async () => {
			try {
				const res = await API.get("/posts/getMy");
				setPosts(res.data);
			} catch (error) {
				console.error("Failed to load user posts:", error.message);
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchMyPosts();
		}
	}, [user]);

	const handleSave = async () => {
		try {
			await API.put(
				"/users/profile",
				{
					fullName: fullNameInput,
					avatar: avatarInput,
					bio: bioInput,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			alert("Profile updated!");
			window.location.reload();
		} catch (error) {
			console.error("Update failed:", error.message);
			alert("Failed to update profile");
		}
	};

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete your account?"))
			return;
		try {
			await API.delete("/users/delete", {
				headers: { Authorization: `Bearer ${token}` },
			});
			alert("Account deleted");
			localStorage.clear();
			window.location.href = "/";
		} catch (error) {
			console.error("Delete failed:", error.message);
			alert("Failed to delete account");
		}
	};

	return (
		<div className="profile-container">
			<div className="banner">
				<div className="banner-top"></div>
				<div className="banner-bottom">
					<div className="profile-info">
						{editMode ? (
							<>
								<input
									type="text"
									value={fullNameInput}
									onChange={(e) => setFullNameInput(e.target.value)}
									placeholder="Full Name"
								/>
								<input
									type="text"
									value={avatarInput}
									onChange={(e) => setAvatarInput(e.target.value)}
									placeholder="Avatar URL"
								/>
								<textarea
									value={bioInput}
									onChange={(e) => setBioInput(e.target.value)}
									placeholder="Bio"
								/>
								<button onClick={handleSave}>Save</button>
								<button onClick={() => setEditMode(false)}>Cancel</button>
							</>
						) : (
							<>
								<span className="profile-name">{user?.fullName}</span>
								<span className="profile-email">{user?.email}</span>
								<p className="profile-bio">
									BIO{user?.bio === "" ? ": EMPTY" : ": " + user?.bio || ""}
								</p>
								<button onClick={() => setEditMode(true)}>Edit Profile</button>
							</>
						)}
					</div>
				</div>
				<div className="avatar-wrapper">
					{user?.avatar ? (
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
				{loading ? (
					<p>Loading posts...</p>
				) : posts.length === 0 ? (
					<p>No posts yet.</p>
				) : (
					<div className="posts-grid">
						{posts.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</div>
				)}
			</div>

			<div style={{ textAlign: "center", marginTop: "2rem" }}>
				<Button
					label="Delete Account"
					onClick={handleDelete}
					className="delete-button"
				/>
			</div>
		</div>
	);
}

export default Profile;
