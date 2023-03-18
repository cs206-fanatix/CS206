import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import PriceHistoryChart from '../../components/PriceHistoryChart';
import QRCode from 'react-qr-code';

const TicketDetail: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const ticket = {
		id: 1,
		title: 'Born Pink World Tour',
		artist: 'Blackpink',
		imageURL: '/static/images/bp.jpg',
		dateTime: '9/3/2023',
		venue: 'Singapore indoor stadium',
	};

    const data = [
        { date: '2022-03-01', price: 100},
        { date: '2022-03-02', price: 120},
        { date: '2022-03-03', price: 180},
        { date: '2022-03-04', price: 150},
        { date: '2022-03-05', price: 100}
      ];

	return (
		<div className="flex flex-col h-screen w-full bg-gradient-to-b from-primary via-secondary/20 to-primary overflow-auto">
			<div>
				<div className="flex mt-8 justify-center">
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
													className={`${
														open ? 'rotate-180 transform' : ''
													} h-5 w-5 ml-auto text-white`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-secondary">
												<div className="pt-2">
													<PriceHistoryChart data={data}/>
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
									Born Pink World Tour
								</h2>
								<h3 className="text-accent pl-4">Blackpink</h3>
								<hr className="h-px w-11/12 mx-auto my-2 bg-primary"></hr>
								<h3 className="text-white pl-5">Not listed</h3>
								<div className="flex pt-3">
									<input
										placeholder="List Price (SGD)"
										className="w-1/2 h-6 p-2 ml-4 rounded-md"
									></input>
									<button
										type="button"
										className="w-1/2 h-6 mx-4 text-white bg-accent hover:bg-pink-900 focus:ring-4 font-medium rounded-md text-sm"
									>
										List Now
									</button>
								</div>
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
													className={`${
														open ? 'rotate-180 transform' : ''
													} h-5 w-5 ml-auto text-white`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-secondary">
												<div className="pt-2">
													<QRCode
														value={ticket.id.toString()}
														style={{
															height: '50%',
															maxWidth: '100%',
															width: '50%',
														}}
														className="ml-auto mr-auto blur"
													></QRCode>
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
														info
													</span>
													<span>Details</span>
												</div>

												<ChevronDownIcon
													className={`${
														open ? 'rotate-180 transform' : ''
													} h-5 w-5 ml-auto mt-1 text-white`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-secondary">
												<div className="flex rounded-lg bg-primary w-full h-7 p-2 items-center">
													<h3 className="text-accent">Owner</h3>
													<p className="text-accent ml-auto">SolGod99</p>
												</div>
												<div className="flex rounded-lg bg-primary w-full h-7 p-2 mt-2 items-center">
													<h3 className="text-accent">Artist Royalties</h3>
													<p className="text-accent ml-auto">50%</p>
												</div>
												<div className="flex rounded-lg bg-primary w-full h-7 p-2 mt-2 items-center">
													<h3 className="text-accent">Listing/Bidding</h3>
													<p className="text-accent ml-auto">Free</p>
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
		</div>
	);
};

export default TicketDetail;
