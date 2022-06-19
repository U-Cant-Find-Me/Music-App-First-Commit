import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { HeartIcon } from '@heroicons/react/solid';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom';
import Link from 'next/link';

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    // const [playlistId, setPlaylistId] = useState(null);
    console.log("You picked ", playlistId);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
                // console.log(setPlaylists);
            });
        }
    }, [session, spotifyApi]);

    // console.log(playlists);
    // // console.log(typeof(playlists));
    // let arr = playlists.map((playlist) => playlist.name)
    // console.log(arr);

    // for (let index = 0; index < playlists.length; index++) {
    //     const element = playlists[index];
    //     // console.log(element);
    //     console.log(element.name);
    // }

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen 
        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36" >
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white">
                    <Link href="/">
                        <a className="flex items-center space-x-2 hover:text-white">
                            <HomeIcon className="h-5 w-5" />
                            <p>Home</p>
                        </a>
                    </Link>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <Link href="/searching">
                        <a className="flex items-center space-x-2 hover:text-white">
                            <SearchIcon className="h-5 w-5" />
                            <p>Search</p>
                        </a>
                    </Link>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-500" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5 text-green-500" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {/* Playlist */}

                {playlists.map((playlists) =>
                    <p key={playlists.id} onClick={() => setPlaylistId(playlists.id)} className="cursor-pointer hover:text-white">{playlists.name}</p>
                )}



            </div>
        </div>
    )
}

export default Sidebar