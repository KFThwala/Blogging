import React, { useState } from "react";
import "./Home.css";

import RecentPosts from "../../components/home/RecentPosts/RecentPosts";
import SuggestedPosts from "../../components/home/SuggestedPosts/SuggestedPosts";
import SearchBar from "../../components/home/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

function Home() {
	return (
		<div>
			<div className="homeContainer">
				<main className="mainContent">
					<RecentPosts />
				</main>
				<aside className="asideContent">
					<SuggestedPosts />
				</aside>
			</div>
			{/* Floating button */}
			<Link to="/create-post" className="floating-button">
				<CiCirclePlus />
			</Link>
		</div>
	);
}

export default Home;
