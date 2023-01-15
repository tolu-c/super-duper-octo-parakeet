import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

function Login({ providers }) {
  // console.log(providers);
  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen w-full">
      <Head>
        <title>Login to my spotify clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        className="w-52 mb-5"
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg capitalize text-lg font-sans font-semibold"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
