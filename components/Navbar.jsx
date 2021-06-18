import Link from "next/link";

const Navbar = () => {
  return (
    <header className="lg:w-4/5 mx-auto">
      <nav>
        <div className="container flex items-center justify-between px-6 py-3 mx-auto">
          <div>
            <Link href="/">
              <a className="text-xl font-semibold text-gray-800 lg:text-xl hover:text-gray-700">
                Twlog 🥓
              </a>
            </Link>
          </div>

          <a
            className="my-1 text-sm font-medium text-gray-700 hover:text-indigo-500 lg:mx-4 lg:my-0"
            href="#"
          >
            <img src="/git.svg" width="30" alt="" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
