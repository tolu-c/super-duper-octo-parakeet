import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { playlistIdState } from "../atoms/playlistAtom";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const spotifyApi = useSpotify();

  const { data: session, status } = useSession();
  const [playlists, setPlayLists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  // console.log(`current playlistId: ${playlistId}`);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlayLists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  // console.log(playlists);

  return (
    <div className="text-gray-500 p-5 text-xs md:text-sm border-r border-gray-900 overflow-y-scroll hide-scrollbar h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>

      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Playlist</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* playlist */}
        {playlists.map((playlist) => (
          <button
            className="flex items-center space-x-2 hover:text-white"
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
          >
            <p>{playlist.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
