import React from "react";
import { APIService } from "../Api";
import LoginStyles from "../Styles/Login.module.scss";
import { FaSpotify, FaGithub, FaHeart } from "react-icons/fa";

export default function Login() {
	return (
		<div className={LoginStyles.container}>
			<div className={LoginStyles.loginCard}>
				<h2>Stringify</h2>
				<p>Music search and share platform powered by Spotify API.</p>

				<button className={LoginStyles.spotifyBtn} onClick={() => APIService.login()}>
					<FaSpotify />
					Log In with Spotify
				</button>

				<a
					href="https://www.google.com"
					className={LoginStyles.githubBtn}
					target="blank"
				>
					<FaGithub />
					Github Repository
				</a>
			</div>
			<div className={LoginStyles.credits}>
				Made with <FaHeart color="#ff0a54" /> by sleepingsaint
			</div>
		</div>
	);
}
