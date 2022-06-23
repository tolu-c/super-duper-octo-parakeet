import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyAPi from "../lib/spotify";

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh access token attempt fails, redirect user to login from spotify
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyAPi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyAPi;
};

export default useSpotify;
