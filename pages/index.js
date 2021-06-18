import Header from "../components/Header";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>twlog ~ instantly convert tweets into blogs</title>
        <meta property="og:title" content="Blog editor ~ twlog" />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/**twlog**.png"
        />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
