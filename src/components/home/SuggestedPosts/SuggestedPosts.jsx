// src/components/home/SuggestedPosts/SuggestedPosts.js

import React from "react";
import "./SuggestedPosts.css";
function SuggestedPosts() {
	// For demo, static list; later fetch from API or props
	const suggested = [
		{ id: 1, title: "How to Use React Effectively" },
		{ id: 2, title: "CSS Grid vs Flexbox: Which to Use?" },
		{ id: 3, title: "JavaScript ES2025 Features" },
	];

	return (
		<div>
			<h2 className="suggested-title">Suggested Posts</h2>
			<ul className="suggested-list">
				{suggested.map((post) => (
					<Link>
						<img src="" alt="" />
						<p>{post.title}</p>
						<p>{post.date}</p>
					</Link>
				))}
			</ul>
		</div>
	);
}

export default SuggestedPosts;
