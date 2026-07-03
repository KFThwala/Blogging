import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import "./Categories.css";

function Categories() {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await API.get("/posts/categories");
				setCategories(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchCategories();
	}, []);

	return (
		<section className="categories-section">
			<div className="categories-header">
				<h2 className="categories-title">Explore Categories</h2>
				<p className="categories-subtitle">
					Find articles based on what you're interested in
				</p>
			</div>

			<div className="categories-grid">
				{categories.map((cat) => (
					<div
						key={cat.name}
						className="category-card"
						onClick={() =>
							navigate(`/blogs?category=${encodeURIComponent(cat.name)}`)
						}>
						<div className="category-icon">
							{cat.name?.charAt(0).toUpperCase()}
						</div>

						<div className="category-content">
							<h3>{cat.name}</h3>
							<p>{cat.count} posts</p>
						</div>

						<div className="category-arrow">→</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default Categories;
