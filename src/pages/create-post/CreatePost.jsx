import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./CreatePost.css";

const CreatePostForm = () => {
	const [title, setTitle] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState(""); // now single-select
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true);

		if (!title || !excerpt || !content || !category) {
			setError("Please fill all required fields");
			setLoading(false);
			return;
		}

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("excerpt", excerpt);
			formData.append("content", content);
			formData.append("categories[]", category); // Send as array
			if (image) {
				formData.append("image", image);
			}

			await API.post("/posts/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setSuccess("Post created successfully!");
			setTitle("");
			setExcerpt("");
			setContent("");
			setCategory("");
			setImage(null);
			setPreview(null);
			navigate("/home");
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<h2>Create New Post</h2>

				<label>Title *</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				<label>Excerpt *</label>
				<input
					type="text"
					value={excerpt}
					onChange={(e) => setExcerpt(e.target.value)}
					required
				/>

				<label>Content *</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={6}
					required
				/>

				<label>Category *</label>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required>
					<option value="">-- Select a category --</option>
					<option value="technology">Technology</option>
					<option value="programming">Programming</option>
					<option value="news">News</option>
					<option value="health">Health</option>
					<option value="education">Education</option>
				</select>

				<label>Image (optional)</label>
				<input type="file" accept="image/*" onChange={handleImageChange} />

				{preview && (
					<div className="image-preview">
						<img src={preview} alt="Preview" />
					</div>
				)}

				<button className="create_post_button" type="submit" disabled={loading}>
					{loading ? "Creating..." : "Create Post"}
				</button>

				{error && <p className="error-text">{error}</p>}
				{success && <p className="success-text">{success}</p>}
			</form>
		</div>
	);
};

export default CreatePostForm;
