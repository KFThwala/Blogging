import React, { useState } from "react";
import "./Home.css";

import RecentPosts from "../../components/home/RecentPosts/RecentPosts";
import SuggestedPosts from "../../components/home/SuggestedPosts/SuggestedPosts";
import SearchBar from "../../components/home/SearchBar/SearchBar";

function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	// You’d pass searchQuery down to RecentPosts or filter posts here
	const handleSearch = (query) => {
		setSearchQuery(query);
	};
	return (
		<div>
			<SearchBar onSearch={handleSearch} />
			<div className="homeContainer">
				<main className="mainContent">
					<RecentPosts />
				</main>
				<aside className="asideContent">
					<SuggestedPosts />
				</aside>
			</div>
		</div>
	);
}

export default Home;
