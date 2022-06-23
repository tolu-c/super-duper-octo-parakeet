import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from './Songs'

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const spotifyAPi = useSpotify();

  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyAPi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log('Something went wrong getting playlist: ', err);
      });
  }, [spotifyAPi, playlistId]);

  // console.log(playlist)

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        {/* TODO: add nav arrows by the left */}
        <div className="w-max h-max rounded-full p-1 pr-2 bg-black cursor-pointer opacity-90 hover:opacity-80 space-x-3 px-1 flex items-center">
          <img
            src={session?.user.image}
            alt="user image"
            className="rounded-full w-10 h-10"
          />
          <h2 className="text-white font-semibold font-sans text-base">
            {session?.user.name}
          </h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img className="h-44 w-44 shadow-2xl object-cover rounded-sm" src={playlist?.images?.[0].url} alt="playlist cover photo" />
        <div>
          <p className="uppercase text-sm font-bold">playlist</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
