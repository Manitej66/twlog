/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const Header = () => {
  const [url, setUrl] = useState("");

  return (
    <Layout>
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="font-bold text-gray-800 text-4xl">
                Convert threads into{" "}
                <span className="text-indigo-500">blogs</span>
              </h1>

              <p className="mt-4 text-gray-600 ">
                Grow your audience{" "}
                <span className="font-medium text-indigo-500">without</span>{" "}
                extra effort
              </p>

              <div className="flex flex-col mt-8 space-y-5">
                <input
                  onChange={(e) => setUrl(e.target.value.trim())}
                  className="px-4 py-3 text-gray-700 w-full bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Twitter Thread ID"
                />
                <Link
                  href={`/devto/${url.split("status/").pop().split("?")[0]}`}
                >
                  <a className="px-4 flex items-center gap-2 text-gray-700 py-3 text-sm tracking-wide font-semibold transition-colors duration-200 transform bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none">
                    <img
                      src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
                      alt="Manitej ⚡'s DEV Community Profile"
                      height="30"
                      width="30"
                    />{" "}
                    POST IN DEV (Max 7 tweets)
                  </a>
                </Link>
                <p className="px-4 flex items-center gap-2 text-gray-700 py-3 text-sm tracking-wide font-semibold transition-colors duration-200 transform bg-gray-200 rounded-lg focus:outline-none">
                  <img
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
                    alt="Manitej ⚡'s DEV Community Profile"
                    height="30"
                    width="30"
                  />{" "}
                  POST IN HASHNODE (SOON)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              src="/mockup.png"
              alt="mockup"
              className="rounded-md shadow-2xl"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Header;
