import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import "./EditPostForm.css"; // uses the same styles as CreatePostForm
import { toast } from "react-hot-toast";

const EditPostForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const { data } = await API.get(`/posts/${id}`);
				setTitle(data.title);
				setExcerpt(data.excerpt);
				setContent(data.content);
				setCategory(data.categories); // assuming this is a single value string
				setImage(data.image);
				setPreview(data.image);
			} catch (err) {
				console.error("Failed to load post", err);
				setError("Could not load post data.");
			}
		};

		fetchPost();
	}, [id]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreview(file ? URL.createObjectURL(file) : null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!title || !excerpt || !content || !category) {
			toast.error("Please fill all required fields");
			setLoading(false);
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("excerpt", excerpt);
		formData.append("content", content);
		formData.append("categories[]", category);
		if (image instanceof File) {
			formData.append("image", image);
		}

		try {
			await API.put(`/posts/${id}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Post updated successfully!");
			navigate(`/post/${id}`);
		} catch (err) {
			console.error("Error updating post", err);
			toast.error("Failed to update post.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form className="edit_form" onSubmit={handleSubmit}>
				<h2>Edit Post</h2>

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

				<label>Change Image</label>
				<input type="file" accept="image/*" onChange={handleImageChange} />

				{preview && (
					<div className="image-preview">
						<img src={preview} alt="Preview" />
					</div>
				)}

				<button className="create_post_button" type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save Changes"}
				</button>

				{error && <p className="error-text">{error}</p>}
				{success && <p className="success-text">{success}</p>}
			</form>
		</div>
	);
};

export default EditPostForm;
