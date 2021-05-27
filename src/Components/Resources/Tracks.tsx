import React, { useState } from "react";
import { TracksListType, TrackType } from "../../types";
import Styles from "../../Styles/Items.module.scss";
import { FaImages, FaInfo } from "react-icons/fa";
import Modal from "react-modal";

export default function Tracks(props: TracksListType) {
	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [track, setTrack] = useState<TrackType | undefined>(undefined);
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
						{track?.album.images.length ? (
							<img src={track.album.images[0].url} alt="album cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<div>
						<h4>{track?.name}</h4>
						<p>{track?.artists.map((artist) => artist.name).join(",")}</p>
						<p>
							{track?.duration_ms
								? Math.floor(track.duration_ms / 60000) +
								  "m " +
								  Math.floor((track.duration_ms % 60000) / 1000) +
								  "s"
								: ""}
						</p>
						<a href={track?.external_urls.spotify} target="blank">
							Check out the album on spotify
						</a>
					</div>
				</div>
			</Modal>
			{props.items.map((track, index) => (
				<div className={Styles.item} key={index}>
					<div className={Styles.cover}>
						{track.album.images.length ? (
							<img src={track.album.images[0].url} alt="track cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<p>{track.name}</p>
					<div
						className={Styles.info}
						onClick={() => {
							setTrack(track);
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
