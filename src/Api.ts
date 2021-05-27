import React, { useEffect, useState } from 'react';
import { SPOTIFY_AUTH_URL, RESPONSE_TYPE, CLIENT_ID, SCOPES, BACKEND_SERVER, REDIRECT_URI } from './Constants';
import { SpotifyResponseType } from './types';

class API {
    // redirecting the user to spotify auth url
    // Adding required scopes and client_id
    login() {
        let authURL = SPOTIFY_AUTH_URL;
        authURL += `?response_type=${RESPONSE_TYPE}`;
        authURL += `&client_id=${CLIENT_ID}`;
        authURL += SCOPES
            ? "&scopes=" + encodeURIComponent(SCOPES.join(" "))
            : "";
        authURL += `&redirect_uri=` + encodeURIComponent(REDIRECT_URI);
        window.location.href = authURL;
    }

    // get accesstoken using the authorization code sent
    // by the spotify AUTH endpoint after registration
    async getAccessToken(code: string) {
        let response = await fetch(BACKEND_SERVER + "getToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
        })

        return response.json();
    }

    // refresh the access token if it expired
    async refreshToken() {
        const REFRESH_TOKEN = localStorage.getItem('refresh_token');
        fetch(BACKEND_SERVER + "refreshToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh_token: REFRESH_TOKEN
            })
        }).then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    console.log(data)
                    if (
                        data.access_token &&
                        data.token_type &&
                        data.expires_in
                    ) {
                        localStorage.setItem("access_token", data.access_token);
                        localStorage.setItem("token_type", data.token_type);
                        let currentTime = new Date();
                        let expiryTime = new Date();
                        expiryTime.setTime(currentTime.getTime() + data.expires_in * 1000);
                        localStorage.setItem("expiry_time", expiryTime.getTime().toString());
                    }
                }
            })
            .catch(err => console.log(err))
    }

    // get search data for a certain query and types
    async getData(query: string, types: Array<string>) {
        const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";
        const ACCESS_TOKEN = localStorage.getItem("access_token");
        const TOKEN_TYPE = localStorage.getItem("token_type");
        const EXPIRY_TIME = localStorage.getItem("expiry_time");

        // checking for token expiration
        if (EXPIRY_TIME && new Date() >= new Date(parseInt(EXPIRY_TIME))) {
            await this.refreshToken();
        }

        let data = await fetch(SEARCH_ENDPOINT + "?q=" + encodeURIComponent(query) + "&type=" + types.join(","), {
            headers: {
                "Authorization": `${TOKEN_TYPE} ${ACCESS_TOKEN}`
            }
        })
        return data.json();
    }
}

export const APIService = new API();

export default function useAPI() {
    const TYPES = ["album", "artist", "playlist", "track", "show", "episode"];

    const [query, setQuery] = useState<string>("");
    const [types, setTypes] = useState<Array<string>>(TYPES);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<SpotifyResponseType | undefined>(undefined);

    const fetchData = async () => {
        setError(null);
        try {
            setLoading(true);
            if (query){
                setData(await APIService.getData(query, types));
            } 
            else setData(undefined);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let mounted = true;
        if (query && types) fetchData();
        return () => {
            mounted = false;
        }
    }, [query, types]);

    return { query, setQuery, types, setTypes, error, loading, data };
}
