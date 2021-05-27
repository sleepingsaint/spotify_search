import React, { useState } from "react";
import { ArtistsListType, ArtistType} from "../../types";
import Styles from "../../Styles/Items.module.scss";
import { FaImages, FaInfo } from "react-icons/fa";
import Modal from "react-modal";

export default function Artists(props: ArtistsListType) {
	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [artist, setArtist] = useState<ArtistType | undefined>(undefined);
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
						{artist?.images.length ? (
							<img src={artist.images[0].url} alt="album cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<div>
						<h4>{artist?.name}</h4>
						<p>{artist?.type}</p>
						<p>{artist?.genres.join(",")}</p>
						<p>Number of Followers: {artist?.followers.total}</p>
						<a href={artist?.href}>Check out the artist on spotify</a>
					</div>
				</div>
			</Modal>
			{props.items.map((artist, index) => (
				<div className={Styles.item} key={index}>
					<div className={Styles.cover}>
						{artist.images.length ? (
							<img src={artist.images[0].url} alt="track cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<p>{artist.name}</p>
					<div className={Styles.info} onClick={() => {
						setShowInfo(true);
						setArtist(artist)
					}}><FaInfo /></div>
				</div>
			))}
		</div>
	);
}

