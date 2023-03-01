import Link from "next/link";
import { useState } from "react";

interface props {
  username: string;
}

const Navbar = (props: props) => {
  const [open, setOpen] = useState(false);

  function toggleDropdown() {
    setOpen(() => !open);
  }

  return (
    <nav className="items-center">
      <div className="bg-primary flex items-center justify-between p-4 drop-shadow-md w-full">
        <div className="flex justify-center gap-10">
          <img src="/logo.png" alt="Logo" className="h-12"></img>
          <div className="flex gap-10 p-4">
            <Link href="#" className="text-secondary font-semibold">
              Category
            </Link>
            <Link href="#" className="text-secondary font-semibold">
              FAQ
            </Link>
          </div>
        </div>

        <form className="flex w-1/5">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full pl-10 p-2.5  dark:bg-primary dark:border-gray-400 dark:placeholder-gray-400 dark:text-secondary dark:focus:ring-secondary dark:focus:border-seoncdary"
              placeholder="Search"
              required
            />
          </div>
        </form>

        <div className="flex gap-4 items-center relative">
          <Link href="#" className="text-secondary font-semibold">
            <img src="/cart.png" className="h-7" />
          </Link>
          <img
            src="/profile.png"
            className="h-8 object-cover  rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {open && (
            <div className="bg-white p-2 w-40 shadow-lg absolute top-9 right-3">
              <h3>{props.username}</h3>
              <hr></hr>
              <ul>
                <li
                  className="p-1 text-xs cursor-pointer rounded hover:bg-accent"
                  key="View Tickets"
                >
                  <Link href="#">View Tickets</Link>
                </li>
                <li
                  className="p-1 text-xs cursor-pointer rounded hover:bg-accent"
                  key="Profile Settings"
                >
                  Profile Settings
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
