import React, { useEffect } from "react";
import { RouterProps } from "react-router";
import RedirectedStyles from "../Styles/RedirectedPage.module.scss";
import Lottie from "react-lottie";
import RelaxLottie from "../assets/relax.json";
import { APIService } from "../Api";
import { AccessTokenType } from "../types";

export default function RedirectedPage(props: RouterProps) {
	useEffect(() => {
		async function getToken() {
			const params = new URLSearchParams(props.history.location.search);
			if (params.has("code")) {
				const AUTH_CODE = params.get("code");
				if (AUTH_CODE) {
					try{
						let data: AccessTokenType = await APIService.getAccessToken(AUTH_CODE);
						if (data.status === "success") {
							if (
								data.access_token &&
								data.refresh_token &&
								data.token_type &&
								data.expires_in
							) {
								localStorage.setItem("access_token", data.access_token);
								localStorage.setItem("refresh_token", data.refresh_token);
								localStorage.setItem("token_type", data.token_type);
								let currentTime = new Date();
								let expiryTime = new Date();
								expiryTime.setTime(
									currentTime.getTime() + data.expires_in * 1000
								);
								localStorage.setItem(
									"expiry_time",
									expiryTime.getTime().toString()
								);
								window.location.href="/search"
							}
						} else {
							alert("Oops! Something went wrong. Please refresh the page again");
						}
					}catch(err){
						console.log(err);
						alert("Oops! Something went wrong. Please refresh the page again")
					}
				}
			}
		}

		getToken()
		return () => {};
	}, []);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: RelaxLottie,
	};

	return (
		<div className={RedirectedStyles.container}>
			<h2>Getting things ready</h2>
			<Lottie
				options={{
					loop: true,
					autoplay: true,
					animationData: RelaxLottie,
				}}
			/>
		</div>
	);
}
