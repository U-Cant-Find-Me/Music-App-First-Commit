import React, { useEffect, useState } from 'react'
import { currentTrackIdState } from '../atoms/songAtom';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';

function useSongInfo() {

    const spotify = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
                    headers: {
                        Authorization: `Bearer ${spotify.getAccessToken()}`
                    }
                }
                ).then(res => res.json());
                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    }, [currentIdTrack, spotify]);

    return songInfo;
}

export default useSongInfo;