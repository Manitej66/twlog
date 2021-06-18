import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="font-inter">
      <Head>
        <title>twlog ~ instantly convert tweets into blogs</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no"
        />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/twlog%20~%20instantly%20convert%20tweets%20into%20blogs.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Generate blogs from twitter threads in single click"
        />
        <meta name="twitter:title" content="twlog" />
        <meta
          name="twitter:image"
          content="https://og-image.vercel.app/twlog%20~%20instantly%20convert%20tweets%20into%20blogs.png"
        />
      </Head>
      <Navbar />
      <div className="md:w-4/5 mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
