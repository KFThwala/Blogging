import React, { useRef } from "react";
import "./SearchBar.css";

function SearchBar({ query, onSearch }) {
	const inputRef = useRef(null);

	const handleChange = (e) => {
		onSearch(e.target.value);
	};

	const clearSearch = () => {
		onSearch("");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<div className="searchBar">
			<input
				ref={inputRef}
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
