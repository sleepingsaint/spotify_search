import React, { useState } from "react";
import { ShowsListType, ShowType } from "../../types";
import Styles from "../../Styles/Items.module.scss";
import { FaImages, FaInfo } from "react-icons/fa";
import Modal from "react-modal";

export default function Shows(props: ShowsListType) {
	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [show, setShow] = useState<ShowType | undefined>(undefined);
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
						{show?.images.length ? (
							<img src={show.images[0].url} alt="album cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<div>
						<h4>{show?.name}</h4>
						<p>{show?.publisher}</p>
						<p>{show?.description}</p>
						<p>{show?.total_episodes}</p>
						<a href={show?.external_urls.spotify} target="blank">
							Check out the album on spotify
						</a>
					</div>
				</div>
			</Modal>
			{props.items.map((show, index) => (
				<div className={Styles.item} key={index}>
					<div className={Styles.cover}>
						{show.images.length ? (
							<img src={show.images[0].url} alt="track cover" />
						) : (
							<FaImages size="50px" color="#ced4da" />
						)}
					</div>
					<p>{show.name}</p>
					<div
						className={Styles.info}
						onClick={() => {
							setShowInfo(true);
							setShow(show);
						}}
					>
						<FaInfo />
					</div>
				</div>
			))}
		</div>
	);
}
