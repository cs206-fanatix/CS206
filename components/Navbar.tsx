import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface props {
  username: string;
}

const Navbar = (props: props) => {
  const [open, setOpen] = useState(false);
  
  let menuRef = useRef();
  const imgRef = useRef();
  
  useEffect(()=>{
    window.addEventListener("mousedown", (e) => {
      if (e.target !== menuRef.current && e.target !== imgRef.current){
        setOpen(false);
      }
    });
  })
 
  function toggleDropdown() {
    setOpen(() => !open);
  }

  return (
    <nav className="items-center w-screen sticky top-0 z-50">
      <div className="bg-primary flex p-4 drop-shadow-md w-full">
        <div className="flex gap-10 w-full">
        <div className="flex cursor-pointer align-auto">
            <Link href="/" passHref>
              <Image src="/static/images/logo.png" alt="Logo" width={140} height={40} />
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


        

        <div className="pr-4 flex gap-4 items-center relative">
          <Link href="#" passHref className="text-secondary font-semibold cursor-pointer">
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
          <div ref={imgRef}>
          <Image src="/static/images/profile.png" alt="Profile" width={40} height={40} className="rounded-full cursor-pointer" onClick={toggleDropdown} />
          </div>

          {open && (
            <div ref={menuRef} className="bg-white p-2 w-40 shadow-lg absolute top-9 right-3">
              <h3>{props.username}</h3>
              <hr></hr>
              <ul>
                <Link href="/view-ticket">
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
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
