import Image from "next/image";
import useSpotify from "../hooks/useSpotify";

function Song({ order, track }) {
  const spotifyAPi = useSpotify();
  // console.log(track.track.album.images[0].height);
  // const imageUrl = track.track.album.images[0].url
  // console.log(imageUrl);

  return (
    <div>
      <div>
        <p>{order + 1}</p>
        <p>{track.track.album.images[0].url}</p>
        {/* <Image src={imageUrl} /> */}
        {/* <img src={imageUrl} alt="song image" /> */}
      </div>
    </div>
  );
}

export default Song;
