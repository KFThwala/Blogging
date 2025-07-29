import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import API from "../../api/axios";
import PostCard from "../../components/common/postCard/PostCard";
import Button from "../../components/common/button/Button";
import ConfirmModal from "../../components/common/confirmModal/ConfirmModal";
import "./Profile.css";
import HomeButton from "../../components/common/homeButton/HomeButton";

function Profile() {
	const { user, token } = useAuth();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);

	const [fullNameInput, setFullNameInput] = useState(user?.fullName || "");
	const [avatarInput, setAvatarInput] = useState(user?.avatar || "");
	const [bioInput, setBioInput] = useState(user?.bio || "");

	// Modal states
	const [showDeletePostModal, setShowDeletePostModal] = useState(false);
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
	const [postToDelete, setPostToDelete] = useState(null);

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

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 2 * 1024 * 1024) {
				alert("Image is too large. Max size is 2MB.");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarInput(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async () => {
		try {
			await API.put(
				"/user/profile-edit",
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
			const message =
				error?.response?.data?.message ||
				"Failed to update profile image might be too big";

			if (message.toLowerCase().includes("file") && message.includes("2MB")) {
				alert("❌ File too large. Maximum allowed size is 2MB.");
			} else {
				alert("❌ " + message);
			}

			console.error("Update failed:", error);
		}
	};

	const handleDeletePost = async (postId) => {
		try {
			await API.delete(`/posts/${postId}`);

			setPosts((prev) => prev.filter((post) => post._id !== postId));
			setShowDeletePostModal(false);
			alert("Post deleted!");
		} catch (error) {
			console.error("Failed to delete post:", error);
			alert("Failed to delete post.");
		}
	};

	const handleDeleteAccount = async () => {
		try {
			await API.delete("/user/delete");
			alert("Account deleted");
			localStorage.clear();
			window.location.href = "/";
		} catch (error) {
			console.error("Delete failed:", error.message);
			alert("Failed to delete account");
		}
	};

	const openDeletePostModal = (postId) => {
		setPostToDelete(postId);
		setShowDeletePostModal(true);
	};

	return (
		<>
			<HomeButton />

			<div className="profile-container">
				{/* Delete Post Confirmation Modal */}
				<ConfirmModal
					isOpen={showDeletePostModal}
					onCancel={() => setShowDeletePostModal(false)}
					onConfirm={() => handleDeletePost(postToDelete)}
					title="Are you sure you want to delete this post?"
					confirmLabel="Delete Post"
					cancelLabel="Cancel"
				/>

				{/* Delete Account Confirmation Modal */}
				<ConfirmModal
					isOpen={showDeleteAccountModal}
					onCancel={() => setShowDeleteAccountModal(false)}
					onConfirm={handleDeleteAccount}
					title="Are you sure you want to delete your account? This cannot be undone."
					confirmLabel="Delete Account"
					cancelLabel="Cancel"
				/>

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
									<button onClick={() => setEditMode(true)}>
										Edit Profile
									</button>
								</>
							)}
						</div>
					</div>

					<label
						className="avatar-wrapper"
						title={editMode ? "Click to change avatar" : ""}>
						{avatarInput ? (
							<img
								className="avatar-img"
								src={avatarInput}
								alt="Avatar preview"
							/>
						) : user.avatar ? (
							<img
								className="avatar-img"
								src={user.avatar}
								alt={user.fullName}
							/>
						) : (
							<div className="avatar-fallback">
								{user?.fullName?.[0]?.toUpperCase()}
							</div>
						)}

						{editMode && (
							<>
								<input
									type="file"
									accept="image/*"
									style={{ display: "none" }}
									onChange={handleAvatarChange}
								/>
								<div className="edit-icon-overlay">✎</div>
							</>
						)}
					</label>
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
								<PostCard
									key={post._id}
									post={post}
									showActions={true}
									currentUserId={user?._id} // Replace `user` with your logged-in user
									onDelete={() => openDeletePostModal(post._id)}
								/>
							))}
						</div>
					)}
				</div>

				<div style={{ textAlign: "center", marginTop: "2rem" }}>
					<Button
						label="Delete Account"
						onClick={() => setShowDeleteAccountModal(true)}
						className="delete-button"
					/>
				</div>
			</div>
		</>
	);
}

export default Profile;
