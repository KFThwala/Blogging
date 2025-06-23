import React from "react";
import "./SamplePostSection.css";

const posts = [
	{
		id: 1,
		title: "How to Start Blogging in 2024",
		snippet:
			"A quick guide to launching your first blog and finding your niche.",
		image:
			"https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 2,
		title: "Top 10 Tools for Modern Writers",
		snippet:
			"Explore powerful tools that make writing, editing, and publishing easier.",
		image:
			"https://images.unsplash.com/photo-1581092334506-c4f8eaf15829?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: 3,
		title: "Why Blogging Still Matters in 2024",
		snippet: "Discover why content creation is more valuable than ever before.",
		image:
			"https://images.unsplash.com/photo-1532619675605-1b4a77e43e52?auto=format&fit=crop&w=800&q=80",
	},
];

function SamplePostsSection() {
	return (
		<section className="sample-posts-section">
			<h2 className="posts-title">Latest Posts</h2>
			<div className="posts-grid">
				{posts.map((post) => (
					<div className="post-card" key={post.id}>
						<img src={post.image} alt={post.title} className="post-image" />
						<div className="post-content">
							<h3>{post.title}</h3>
							<p>{post.snippet}</p>
							<a href="/blog" className="read-more">
								Read More →
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default SamplePostsSection;
