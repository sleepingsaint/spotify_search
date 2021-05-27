import React, { useState } from "react";
import useAPI from "../Api";
import SearchStyles from "../Styles/SearchSongs.module.scss";
import { FaSearch } from "react-icons/fa";
import Albums from "./Resources/Albums";
import Tracks from "./Resources/Tracks";
import Shows from "./Resources/Shows";
import Playlists from "./Resources/Playlists";
import Artists from "./Resources/Artists";
export default function SearchSongs() {
	const { query, setQuery, error, loading, data } = useAPI();

	return (
		<div className={SearchStyles.container}>
			<h1>Stringify</h1>
			<div className={SearchStyles.searchBar}>
				<input
					type="text"
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setQuery(e.target.value)
					}
					placeholder="Seach for songs"
				/>
				<FaSearch />
			</div>

			{loading && <p>Searching Results...</p>}
			{error && <p>Oops! Something went wrong</p>}
			{data?.albums && (
				<div>
					<h4>Albums</h4>
					<hr />
					<Albums {...data.albums} />
				</div>
			)}

			{data?.tracks && (
				<div>
					<h4>Tracks</h4>
					<hr />
					<Tracks {...data.tracks} />
				</div>
			)}

			{data?.shows && (
				<div>
					<h4>Shows</h4>
					<hr />
					<Shows {...data.shows} />
				</div>
			)}

			{data?.playlists && (
				<div>
					<h4>Playlists</h4>
					<hr />
					<Playlists {...data.playlists} />
				</div>
			)}

			{data?.artists && (
				<div>
					<h4>Artists</h4>
					<hr />
					<Artists {...data.artists} />
				</div>
			)}
			
		</div>
	);
}
