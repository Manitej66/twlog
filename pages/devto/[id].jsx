/* eslint-disable react/no-unescaped-entities */
import Layout from "../../components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

const Thread = ({ data, error }) => {
  const [thread, setThread] = useState(data);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  const [published_url, setPublished_url] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("key")) {
      setKey(localStorage.getItem("key"));
    }
  }, []);

  const publish = () => {
    if (key.length > 10) {
      localStorage.setItem("key", key);
      setLoading(true);
      const options = {
        method: "POST",
        url: "/api/thread/post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${key}`,
        },
        data: {
          title: thread.title,
          body_markdown: thread.body_markdown,
          tags: thread.tags,
        },
      };

      axios
        .request(options)
        .then((res) => {
          if (res.data.error) {
            setMessage(res.data.error);
          }
          setPublished_url("https://dev.to/dashboard");
          setLoading(false);
          setMessage("Published successfully");
          setTimeout(() => {
            setPublished_url("");
          }, 3000);
        })
        .catch((e) => {
          setLoading(false);
          alert(e.message);
        });
    } else {
      alert("enter api key");
    }
  };

  if (error) return <Layout>{error}</Layout>;

  return (
    <Layout>
      <Head>
        <title>Blog editor ~ twlog</title>
        <meta property="og:title" content="Blog editor ~ twlog" />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/**twlog**.png"
        />
      </Head>
      <div className="flex w-[90%] mx-auto mt-4 justify-between items-center">
        <p className="text-2xl text-indigo-700 font-bold">Blog editor</p>
        <div>
          <button
            disabled={loading}
            onClick={publish}
            className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {loading ? "publishing.." : "Publish draft"}
          </button>
        </div>
      </div>
      {published_url.trim() && (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-center w-12 bg-green-500">
            <svg
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
            </svg>
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-green-500 dark:text-green-400">
                {message}
              </span>
              <br />
              <a
                href={published_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 uppercase underline dark:text-gray-200"
              >
                view draft
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-[90%] mx-auto rounded-md border border-gray-200 mt-4">
        <div className="px-4 py-2">
          <p className="p-2">Blog title</p>
          <input
            type="text"
            maxLength={80}
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
            value={thread?.title}
            onChange={(e) =>
              setThread((p) => ({ ...p, title: e.target.value }))
            }
          />
        </div>
        <div className="px-4 py-2">
          <p className="p-2">Blog cover image</p>
          <Image
            src={`https://og-image.vercel.app/${thread?.title}.png`}
            width={320}
            height={200}
            priority={true}
            className="rounded-xl border border-gray-200"
            alt="img"
          />
        </div>
        <div className="px-4 py-2">
          <p className="p-2">Blog tags (seperate with , )</p>
          <input
            type="text"
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
            value={thread?.tags.toString()}
            onChange={(e) =>
              setThread((p) => ({
                ...p,
                tags: e.target.value.split(",").map((d) => d.trim()),
              }))
            }
          />
        </div>
        <div className="px-4 py-2">
          <p className="p-2">
            DEV.TO api key{" "}
            <span className="text-red-400">(we won"t store in anywhere)</span>{" "}
            <a href="https://dev.to/settings/account" className="underline">
              (get key from here)
            </a>
          </p>
          <input
            type="text"
            value={key}
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
            onChange={(e) => setKey(e.target.value.trim())}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Thread;

export const getServerSideProps = async (context) => {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_URL
      : "http://localhost:3000/api";
  const res = await fetch(`${url}/thread/${context.query.id}`);
  const data = await res.json();

  if (data) {
    return {
      props: {
        data,
        error: null,
      },
    };
  } else {
    return {
      props: {
        data: null,
        error: "something went wrong",
      },
    };
  }
};
