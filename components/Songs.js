import { playlistState } from "../atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="px-8 flex flex-col pb-28 text-white space-y-1">
      {playlist?.tracks.items.map((track, index) => (
        <Song key={track.track.id} track={track} order={index} />
      ))}
    </div>
  );
};

export default Songs;
