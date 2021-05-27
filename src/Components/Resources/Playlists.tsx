import React, { useState } from "react";
import { PlaylistsListType, PlaylistType } from "../../types";
import Styles from "../../Styles/Items.module.scss";
import { FaImages, FaInfo } from "react-icons/fa";
import Modal from "react-modal";

export default function Playlists(props: PlaylistsListType) {
	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [playlist, setPlaylist] = useState<PlaylistType | undefined>(undefined);

	return (
		<div className={Styles.container}>
			<Modal
				isOpen={showInfo}
				shouldCloseOnOverlayClick={true}
				onRequestClose={() => setShowInfo(false)}
				style={{
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						overflow: "visible",
					},
				}}
			>
				<div className={Styles.infoContainer}>
					<div className={Styles.coverimg}>
						{playlist?.images.length ? (
							<img src={playlist.images[0].url} alt="album cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<div>
						<h4>{playlist?.name}</h4>
						<p>{playlist?.description}</p>
						<p>{playlist?.owner.display_name}</p>
						<p>{playlist?.tracks.total}</p>
						<a href={playlist?.external_urls.spotify} target="blank">Check out the playlist on spotify</a>
					</div>
				</div>
			</Modal>
			{props.items.map((playlist, index) => (
				<div className={Styles.item} key={index}>
					<div className={Styles.cover}>
						{playlist.images.length ? (
							<img src={playlist.images[0].url} alt="track cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<p>{playlist.name}</p>
					<div
						className={Styles.info}
						onClick={() => {
							setPlaylist(playlist);
							setShowInfo(true);
						}}
					>
						<FaInfo />
					</div>
				</div>
			))}
		</div>
	);
}
