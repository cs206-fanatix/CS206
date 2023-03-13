import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

// test

const Home: NextPage = () => {
	return (
		<div className="h-screen w-full overflow-auto">
			<div className="">
				<div className="relative flex bg-gradient-to-tr from-gray-100 via-secondary to-black">
					<div className="w-full h-136 overflow-hidden">
						<Image
							src="/static/images/1975.jpg"
							layout="fill"
							objectFit="cover"
							objectPosition="top"
							className="opacity-55"
						></Image>
					</div>

					<div className="ml-auto z-1 flex flex-col w-max mt-24 mr-10">
						<h1 className="text-white text-4xl font-bold">
							THE 1975 are coming to Singapore!
						</h1>
						<h1 className="text-gray-100 text-xl font-semibold">
							2023's most famous British band promise only more show-stopping
							moments in Singapore in July!
						</h1>
						<Link href="#">
							<a className="ml-auto text-white bg-accent rounded-xl px-4 py-1 text-xl items-center">
								Buy Ticket
							</a>
						</Link>
					</div>
				</div>
				<div className='mt-4 ml-auto mr-auto w-3/4'>
					<Image
						src="/static/images/Poster.jpg"
						width={1500}
						height={2000}
					></Image>
				</div>
			</div>
			{false && (
				<div className="h-3/5 relative bg-gradient-to-r from-gray-100 via-black to-secondary">
					<div className="w-full "></div>

					<div className="ml-auto absolute"></div>
				</div>
			)}
			<div className="">
				<div></div>
			</div>
		</div>
	);
};

export default Home;
