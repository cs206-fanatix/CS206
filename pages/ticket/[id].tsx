import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import PriceHistoryChart from '../../components/PriceHistoryChart';
import QRCode from 'react-qr-code';
import { useUserStore } from '../../stores/user-store';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { format } from 'date-fns';

const TicketDetail: NextPage = () => {
	const router = useRouter();
	const userStore = useUserStore();
	const { id } = router.query;
	const [ticket, setTicket] = useState<any>()
	const [blur, setBlur] = useState(true);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [password, setPassword] = useState("");
	const [listPrice, setListPrice] = useState("");
	const [status, setStatus] = useState("Not Listed")
	const passwordInput = useRef<HTMLInputElement>(null);
	const data = [
		{ date: '2022-03-01', price: 100 },
		{ date: '2022-03-02', price: 120 },
		{ date: '2022-03-03', price: 180 },
		{ date: '2022-03-04', price: 150 },
		{ date: '2022-03-05', price: 100 }
	];

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleListPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setListPrice(event.target.value);
	};

	const handlePasswordSubmit = () => {
		setShowConfirmation(!showConfirmation)
		setBlur(!blur)
		setPassword("")

		const timer = setTimeout(() => {
			setBlur(true)
		}, 10000)

		return () => clearTimeout(timer)
	};

	useEffect(() => {
		passwordInput?.current?.focus()
	})

	function showConfirmationBox() {
		setShowConfirmation(!showConfirmation)
		setPassword("")
	}

	useEffect(() => {
		async function getEvent() {
			try {
				let res = await axios.get("/api/tickets/" + id);
				let data = await res.data
				data.eventDateTime = format(new Date(data.event.eventDateTime), 'dd/MM/yyyy (EEE)')
				if (data.status === "listed") {
					setStatus("Listed")
				}
				setTicket(data)
			} catch (error) {
				console.log(error);
			}
		}
		getEvent()
	}, [])

	useEffect(() => {
		userStore.fetch()
	}, [userStore])

	return (
		<div className="flex flex-col h-screen w-full bg-gradient-to-b from-primary via-secondary/20 to-primary overflow-auto relative">
			{showConfirmation &&
				<div className="z-1 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="absolute w-96 mt-32 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={handlePasswordSubmit}>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Confirm Password
								</label>
								<div className="mt-1">
									<input
										id="password"
										ref={passwordInput}
										name="password"
										type="password"
										autoComplete="current-password"
										value={password}
										onChange={handlePasswordChange}
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className='flex gap-4'>
								<button
									type="button"
									onClick={showConfirmationBox}
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Confirm
								</button>
							</div>
						</form>
					</div>
				</div>}
			<div className={`flex mt-8 justify-center ${showConfirmation ? "blur-md" : ""}`}>
				<div className="flex">
					<div>
						<Image
							src="/static/images/bp.jpg"
							width={500}
							height={400}
							className="object-cover"
						></Image>
						<div className="pt-2 w-full">
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex w-full rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75">
											<div className="flex items-center">
												<span className="material-symbols-outlined pr-1">
													insights
												</span>
												<span>Price History</span>
											</div>
											<ChevronDownIcon
												className={`${open ? 'rotate-180 transform' : ''
													} h-5 w-5 ml-auto text-white`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-secondary">
											<div className="pt-2">
												<PriceHistoryChart data={data} />
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						</div>
					</div>
					<div className="flex flex-col w-96 flex-1">
						<div className="ml-6 bg-secondary h-40 rounded-lg">
							<h2 className="text-primary text-xl font-bold pl-4 pt-3">
								{ticket?.event.name}
							</h2>
							<h3 className="text-accent pl-4">{ticket?.event.artist}</h3>
							<hr className="h-px w-11/12 mx-auto my-2 bg-primary"></hr>
							<h3 className="text-white pl-5">{status}</h3>
							<form>
								<div className="flex pt-3">
									<input
										id="listedPrice"
										name="listedPrice"
										placeholder="List Price (SGD)"
										className="w-1/2 h-6 p-2 ml-4 rounded-md"
										value={listPrice}
										onChange={handleListPriceChange}
									></input>
									<button
										type="button"
										className="w-1/2 h-6 mx-4 text-white bg-accent hover:bg-pink-900 focus:ring-4 font-medium rounded-md text-sm"
									>
										List Now
									</button>
								</div>
							</form>
						</div>
						<div className="ml-6 pt-2">
							<Disclosure defaultOpen={true}>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex w-full rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75">
											<div className="flex items-center">
												<span className="material-symbols-outlined pr-1">
													info
												</span>
												<span>Details</span>
											</div>

											<ChevronDownIcon
												className={`${open ? 'rotate-180 transform' : ''
													} h-5 w-5 ml-auto mt-1 text-white`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-secondary">
											<div className="flex flex-col rounded-lg bg-primary w-full p-2 items-center">
												<div className='flex w-full'>
													<h3 className="text-accent">Level:</h3>
													<p className="text-accent ml-auto">{ticket?.level}</p>
												</div>
												<div className='flex w-full'>
													<h3 className="text-accent">Category:</h3>
													<p className="text-accent ml-auto">{ticket?.category}</p>
												</div>
												<div className='flex w-full'>
													<h3 className="text-accent">Seat:</h3>
													<p className="text-accent ml-auto">{ticket?.seatNo}</p>
												</div>
											</div>
											<div className="flex rounded-lg bg-primary w-full h-7 p-2 mt-2 items-center">
												<h3 className="text-accent">Owner:</h3>
												<p className="text-accent ml-auto">{ticket?.owner.name}</p>
											</div>
											<div className="flex rounded-lg bg-primary w-full h-7 p-2 mt-2 items-center">
												<h3 className="text-accent">Artist Royalties:</h3>
												<p className="text-accent ml-auto">50%</p>
											</div>
											<div className="flex rounded-lg bg-primary w-full h-7 p-2 mt-2 items-center">
												<h3 className="text-accent">Listing/Bidding:</h3>
												<p className="text-accent ml-auto">Free</p>
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						</div>
						<div className="ml-6 pt-2">
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex w-full rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75">
											<div className="flex items-center">
												<span className="material-symbols-outlined pr-1">
													qr_code
												</span>
												<span>QR code for events</span>
											</div>
											<ChevronDownIcon
												className={`${open ? 'rotate-180 transform' : ''
													} h-5 w-5 ml-auto text-white`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-secondary relative">
											{blur && <button type="button" onClick={showConfirmationBox} className='z-1 absolute mt-24 ml-28 text-white bg-accent rounded-xl px-4 py-1 text-lg hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300'>View QR</button>}
											<div className="pt-2">
												<QRCode
													value={ticket ? ticket?.id.toString() : "1"}
													style={{
														height: '600%',
														maxWidth: '100%',
														width: '60%',
													}}
													className={`ml-auto mr-auto pt-2 ${blur ? "blur" : ""}`}
												></QRCode>
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketDetail;
