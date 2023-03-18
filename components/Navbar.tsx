import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../stores/user-store";

interface IUser {
  id: string;
  email: string;
  name: string;
}

const Navbar = () => {
  const router = useRouter();
  const userStore = useUserStore();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>();

  const menuRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // window.addEventListener("click", (e) => {
    //   if (e.target !== menuRef.current && e.target !== imgRef.current){
    //     setOpen(false);
    //   }
    // });

    userStore.fetch();
  }, []);

  function toggleDropdown() {
    setOpen(() => !open);
  }

  async function logout() {
    try {
      await axios.get("/api/logout");
    } catch (e) {
      console.log(e);
    }
    router.reload();
  }

  return (
    <nav className="items-center w-screen sticky top-0 z-50">
      <div className="bg-primary flex p-4 drop-shadow-md w-full">
        <div className="flex gap-10 w-full">
          <div className="flex cursor-pointer align-auto">
            <Link href="/" passHref>
              <Image
                src="/static/images/logo.png"
                alt="Logo"
                width={140}
                height={40}
              />
            </Link>
          </div>
          <div className="flex gap-10 p-4">
            <Link href="#" className="text-secondary font-semibold">
              Category
            </Link>
            <Link href="#" className="text-secondary font-semibold">
              FAQ
            </Link>
          </div>
          <form className="flex h-2/3 mb-auto mt-auto w-[40%]">
            <div className="flex relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full pl-10 p-2.5"
                placeholder="Search for concerts/artists"
                required
              />
            </div>
          </form>
        </div>

        <div className="px-4 flex gap-4 items-center relative">
          {/* display login and signup button if user is not logged in */}

          {userStore.user == null && (
            <Link href="/login" passHref>
              <a className="whitespace-nowrap w-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-red-900">
                Log In
              </a>
            </Link>
          )}

          {userStore.user == null && (
            <Link href="/signup" passHref>
              <a className="whitespace-nowrap w-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-red-900">
                Sign Up
              </a>
            </Link>
          )}

          {userStore.user != null && (
            <Link
              href="#"
              passHref
              className="text-secondary font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
          )}
          {userStore.user != null && (
            <div ref={imgRef}>
              <Image
                src="/static/images/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
            </div>
          )}
          {open && (
            <div
              ref={menuRef}
              className="bg-white p-2 w-40 shadow-lg absolute top-9 right-3"
            >
              <h3>{userStore.user?.name}</h3>
              <hr></hr>
              <ul>
                <Link href="/view-ticket" passHref>
                  <li
                    className="p-1 text-xs cursor-pointer rounded hover:bg-accent"
                    key="View Tickets"
                    onClick={toggleDropdown}
                  >
                    View Tickets
                  </li>
                </Link>
                <li
                  className="p-1 text-xs cursor-pointer rounded hover:bg-accent"
                  key="Profile Settings"
                >
                  Profile Settings
                </li>
                <li
                  className="p-1 text-xs cursor-pointer rounded hover:bg-accent"
                  key="View Tickets"
                  onClick={logout}
                >
                  Log Out
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
