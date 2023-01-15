import { useRecoilState } from "recoil";
import useSpotify from "./useSpotify";
import { currentTrackIdState } from "../atoms/songAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (!currentTrackId) return;

      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());

      setSongInfo(trackInfo);
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
