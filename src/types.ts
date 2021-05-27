// Auth Interfaces
export interface AccessTokenType {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
	status: string;
}

interface ImageType{
    height: number;
    width: number;
    url: string;
}

interface ExternalUrlsType{
    spotify?: string;
}

// Albums Interfaces
interface AlbumArtist{
    external_urls: ExternalUrlsType;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface AlbumType{
    album_type: string;
    artists: Array<AlbumArtist>;
    available_markets: Array<string>;
    external_urls: ExternalUrlsType;
    href: string;
    id: string;
    images: Array<ImageType>;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface AlbumsListType{
    href: string;
    items: Array<AlbumType>;
    limit: number;
    next: string;
    offset: string;
    previous: null | string;
    total: number;
}

// Artist Interfaces
export interface ArtistType{
    external_urls: any;
    followers: {
        href: null | string;
        total: number;
    }
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<ImageType>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ArtistsListType{
    href: string;
    items: Array<ArtistType>;
    limit: number;
    next: string;
    offset: string;
    previous: null | string;
    total: number;
}

// Episode Interfaces
export interface EpisodeType{
    audio_preview_url: string;
    description: string;
    duration_ms: number;
    explicit: false;
    external_urls: ExternalUrlsType;
    href: string;
    html_description: string;
    id: string;
    images: Array<ImageType>;
    is_externally_hosted: boolean;
    is_playable: boolean;
    language: string;
    languages: Array<string>;
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
}

export interface EpisodesListType{
    href: string;
    items: Array<EpisodeType>;
    limit: number;
    next: string;
    offset: string;
    previous: null | string;
    total: number;
}

// Playlist Interfaces
interface PlaylistTrackType{
    href: string;
    total: number;
}

export interface PlaylistType{
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrlsType;
    href: string;
    id: string;
    images: Array<ImageType>;
    name: string;
    owner: {
        display_name: string;
        external_urls: ExternalUrlsType;
        href: string;
        id: string;
        type: string;
        uri: string;
    }
    primary_color: null | string;
    public: null | boolean;
    snapshot_id: string;
    tracks: PlaylistTrackType;
    type: string;
    uri: string;
}

export interface PlaylistsListType{
    href: string;
    items: Array<PlaylistType>;
    limit: number;
    next: string;
    offset: string;
    previous: null | string;
    total: number;
}

// Show Interfaces
export interface ShowType{
    available_markets: Array<string>;
    copyrights: Array<string>;
    description: string;
    explicit: boolean;
    external_urls: ExternalUrlsType;
    href: string;
    html_description: string;
    id: string;
    images: Array<ImageType>;
    is_externally_hosted: boolean;
    languages: Array<string>;
    media_type: string;
    name: string;
    publisher: string;
    total_episodes: number;
    type: string;
    uri: string;
}

export interface ShowsListType{
    href: string;
    items: Array<ShowType>;
    limit: number;
    next: string;
    offset: string;
    previous: null | string;
    total: number;
}

// Track Interfaces
interface TrackArtistType{
    external_urls: ExternalUrlsType;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface TrackType{
    album: AlbumType;
    artists: Array<TrackArtistType>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: false;
    external_ids: {isrc: string}
    external_urls: ExternalUrlsType;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: null | string;
    track_number: number;
    type: string;
    uri: string;
    images: Array<ImageType>;
}

export interface TracksListType{
    href: string;
    items: Array<TrackType>;
    limit: number;
    next: string;
    offset: number;
    previous: null | string;
    total: number
}

// Entire Type
export interface SpotifyResponseType{
    albums?: AlbumsListType;
    artists?: ArtistsListType;
    episodes?: EpisodesListType;
    playlists?: PlaylistsListType;
    shows?: ShowsListType;
    tracks?: TracksListType;
}