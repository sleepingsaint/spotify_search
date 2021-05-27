import React, { useState } from "react";
import { AlbumsListType, AlbumType } from "../../types";
import Styles from "../../Styles/Items.module.scss";
import { FaImages, FaInfo } from "react-icons/fa";
import Modal from "react-modal";

export default function Albums(props: AlbumsListType) {
	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [album, setAlbum] = useState<AlbumType | undefined>(undefined);

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
						{album?.images.length ? (
							<img src={album.images[0].url} alt="album cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<div>
						<h4>{album?.name}</h4>
						<p>{album?.artists.map((artist) => artist.name).join(",")}</p>
						<p>{album?.release_date}</p>
						<a href={album?.external_urls.spotify} target="blank">
							Check out the album on spotify
						</a>
					</div>
				</div>
			</Modal>
			{props.items.map((album, index) => (
				<div className={Styles.item} key={index}>
					<div className={Styles.cover}>
						{album.images.length ? (
							<img src={album.images[0].url} alt="album cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<p>{album.name}</p>
					<div
						className={Styles.info}
						onClick={() => {
							setAlbum(album);
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
