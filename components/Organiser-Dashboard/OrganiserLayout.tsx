import React, { ReactNode } from 'react';
import { useRouter } from "next/router";
import Navbar from "../Organiser-Dashboard/Navbar (Organiser)";


import { useEffect } from "react";
import Head from "next/head";

interface Props {
  children: ReactNode;
}

const OrganiserLayout = ({children}: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // set overflow: hidden for body
    return () => {
      document.body.style.overflow = "visible"; // reset overflow on unmount
    };
  }, []); // run this effect only once when the component mounts

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default OrganiserLayout;
