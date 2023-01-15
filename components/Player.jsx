import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log(`Now Playing ${data.body?.item}`);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((error) => {});
    }, 300),
    []
  );

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  return (
    <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images?.[0]?.url}
          alt={songInfo?.name}
          className="hidden md:inline h-10 w-10"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="icons" />
        <RewindIcon className="icons" />
        {isPlaying ? (
          <PauseIcon className="icons w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="icons w-10 h-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="icons" />
        <RefreshIcon className="icons" />
      </div>
      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="icons"
        />
        <input
          type="range"
          name="volume"
          onChange={(e) => {
            setVolume(Number(e.target.value));
          }}
          value={volume}
          min={0}
          max={100}
          className="w-14 md:w-28"
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="icons"
        />
      </div>
    </div>
  );
};

export default Player;
