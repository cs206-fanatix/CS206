import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface props {
  username: string;
}

const Navbar = (props: props) => {
  const [open, setOpen] = useState(false);

  function toggleDropdown() {
    setOpen(() => !open);
  }

  return (
    <nav className="items-center w-screen bg-primary fixed z-1">
      <div className="bg-primary flex items-center justify-between p-4 drop-shadow-md w-full">
        <div className="flex gap-10 w-full justify-start">
          
          <div className="flex cursor-pointer w-1/12 align-auto justify-center">
            <Link href="/organiser-dashboard" passHref>
              <Image src="/static/images/logo.png" alt="Logo" width={1000} height={34} />
            </Link>
          </div>
                    
          <div className="flex gap-10 p-4">
            <Link href="#" className="text-secondary font-semibold">
              FAQ
            </Link>
          </div>
          <form className="flex h-2/3 mb-auto mt-auto w-[40%] bg-primary">
            <div className="flex relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full pl-10 p-2.5  dark:bg-primary dark:border-gray-400 dark:placeholder-gray-400 dark:text-secondary dark:focus:ring-secondary dark:focus:border-seoncdary"
                placeholder="Search for concerts/artists"
                required
              />
            </div>
          </form>
        </div>
        

        <div className="pr-4 flex gap-4 items-center relative">
          <Link href="/create-event" className="text-secondary font-semibold">Create</Link>
          <Image src="/static/images/profile.png" alt="Profile" width={40} height={40} className="h-11 object-cover rounded-full cursor-pointer" onClick={toggleDropdown} />
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
