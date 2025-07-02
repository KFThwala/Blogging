import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
	const [query, setQuery] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		onSearch(value); // Send query up for filtering
	};

	const clearSearch = () => {
		setQuery("");
		onSearch("");
	};

	return (
		<div className="searchBar">
			<input
				type="search"
				placeholder="Search posts..."
				value={query}
				onChange={handleChange}
				aria-label="Search posts"
			/>
			{query && (
				<button onClick={clearSearch} aria-label="Clear search">
					&times;
				</button>
			)}
		</div>
	);
}

export default SearchBar;
