import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../../api/axios";

function HomeCategories() {
	const [posts, setPosts] = useState([]);
	const [searchParams] = useSearchParams();

	const category = searchParams.get("category");

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				let url = "/posts";

				// if category exists, filter
				if (category) {
					url = `/posts?category=${category}`;
				}

				const res = await API.get(url);
				setPosts(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchPosts();
	}, [category]);

	return (
		<div>
			<h2>{category ? `${category} Posts` : "All Blogs"}</h2>

			{posts.map((post) => (
				<div key={post._id}>
					<h3>{post.title}</h3>
				</div>
			))}
		</div>
	);
}

export default HomeCategories;
