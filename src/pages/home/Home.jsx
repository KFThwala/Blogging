import React from "react";
import "./Home.css";
import FeaturedPosts from "../../components/home/FeaturedPosts/FeaturedPosts";
import RecentPosts from "../../components/home/RecentPosts/RecentPosts";

function Home() {
	return (
		<div className="homeContainer">
			<FeaturedPosts />
			<RecentPosts />
		</div>
	);
}

export default Home;
