import Image from "next/image";
import Link from "next/link";
import DetailDisclosure from "../../components/DetailDisclosure";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useUserStore } from "../../stores/user-store";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "date-fns";

const EventDetails = () => {
	const router = useRouter();
	const userStore = useUserStore();
	const { id } = router.query;
	const [banner, setBanner] = useState<any>();

	useEffect(() => {
		async function getEvent() {
			try {
				let res = await axios.get("/api/events/" + id);
				let data = await res.data;
				if (data !== null) {
					data.eventDateTime = format(
						new Date(data.eventDateTime),
						"dd/MM/yyyy (EEE)"
					);
				}
				setBanner(data);
			} catch (error) {
				console.log(error);
			}
		}
		getEvent();
	}, [router]);

	const data = [
		{
			id: 1,
			icon: "description",
			title: "Event Details",
			content:
				"The 1975 is an English pop rock band formed in Manchester in 2002. The band consists of lead vocalist and rhythm guitarist Matthew Healy, lead guitarist Adam Hann, bassist Ross MacDonald, and drummer George Daniel. Known for their unique blend of indie rock, pop, and electronic music, the 1975 have released several successful albums and singles since their debut in 2013. Their music often explores themes of love, relationships, and modern culture, with lyrics that are both introspective and socially conscious. The band has gained a dedicated fan base around the world and is known for their high-energy live performances, which often feature elaborate stage designs and visual effects. With their unique sound and style, the 1975 continue to push the boundaries of contemporary pop music and inspire a new generation of fans.",
		},
		{
			id: 2,
			icon: "quiz",
			title: "FAQ",
			content: `1. The Organiser/Venue Owner reserves the right without refund or compensation to refuse admission/evict any person(s) whose conduct is disorderly or inappropriate or who poses a threat to security, or to the enjoyment of the Event by others.\n
        2. Ticket holders assume all risk of injury and all responsibility for property loss, destruction or theft and release the promoters, performers, sponsors, ticket outlets, venues, and their employees from any liability thereafter.\n
        3. The resale of ticket(s) at the same or any price in excess of the initial purchase price is prohibited.\n
        4. There is no refund, exchange, upgrade, or cancellation once ticket(s) are sold.\n
        5. We would like to caution members of the public against purchasing tickets from unauthorized sellers or 3rd party websites. By purchasing tickets through these non-authorized points of sale, buyers take on the risk that the validity of the tickets cannot be guaranteed, with no refunds possible.`,
		},
		{
			id: 3,
			icon: "info",
			title: "Admission Policy",
			content: `1. Admission to show/venue by full ticket only. Printed/electronic tickets must be produced for admission.\n
        2. There will be no admission for infants in arms and children below 6 years old.\n
        3. Individuals aged 6 years old and above will be required to purchase a ticket for admission.\n
        4. No photography and videography allowed.\n
        5. STRICTLY No Social Media Live Streaming is allowed.\n
        6. No outside food and beverage are allowed into the venue.`,
		},
	];

	const detail = data.map((item) => {
		return (
			<DetailDisclosure
				key={item.id}
				icon={item.icon}
				title={item.title}
				content={item.content}
			/>
		);
	});

	useEffect(() => {
		if (userStore.user == null) {
			userStore.fetch();
		}
	}, [userStore.user]);

	return (
		<div className="h-screen w-full bg-gradient-to-b from-primary via-secondary/20 to-primary overflow-auto">
			<div className="relative flex bg-gradient-to-tr from-black to-black w-full">
				<div className="w-full h-104 overflow-hidden">
					<Image
						src={banner?.imageUrl}
						layout="fill"
						objectFit="cover"
						objectPosition="right"
						className="opacity-40 blur-sm"
					></Image>
					<div className="mt-8 ml-28">
						<Image
							src={banner?.imageUrl}
							width={800}
							height={350}
							objectPosition="center"
							className="rounded-lg"
						></Image>
					</div>
				</div>

				<div className="z-1 flex flex-col bg-secondary p-3 w-176 ">
					<h1 className="text-white text-3xl font-bold pl-1">{banner?.name}</h1>
					<h2 className="text-gray-400 text-sm font-semibold pt-1 pl-1">
						By {banner?.artist}
					</h2>
					<div className="text-white items-center flex pt-3 pl-1">
						<span className="material-symbols-outlined pr-1">
							calendar_month
						</span>
						<span className="pl-2 text-base">{banner?.eventDateTime}</span>
					</div>
					<div className="text-white items-center flex pt-3 pl-1">
						<span className="material-symbols-outlined pr-1">pin_drop</span>
						<span className="pl-2 text-base">{banner?.venue}</span>
					</div>
					<div className="text-white items-center flex pt-3 pl-1">
						<span className="material-symbols-outlined pr-1">
							request_quote
						</span>
						<span className="pl-2 text-base">S$100 - S$400</span>
					</div>
					<div className="mt-auto py-2">
						<Link href={`/event/${encodeURIComponent(banner?.id)}`}>
							<a className="text-white bg-accent rounded-xl px-10 py-1 text-xl flex justify-center hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300">
								Buy Ticket
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="p-8 flex">
				<div className="flex flex-col w-7/12 gap-3">{detail}</div>
				<div className="flex flex-col ml-auto w-96">
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full rounded-lg bg-blue-900 px-4 py-2 z-1 text-left text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75">
									<div className="flex items-center">
										<span className="material-symbols-outlined pr-1">
											attach_money
										</span>
										<span>Ticket Pricing</span>
									</div>
									<ChevronDownIcon
										className={`${
											open ? "rotate-180 transform" : ""
										} h-5 w-5 ml-auto text-white`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pt-3 pb-2 text-sm -mt-3 bg-secondary rounded-b-lg">
									<h1 className="text-accent text-lg py-2 pl-1 font-bold">
										STANDARD
									</h1>
									<p className="text-white text-base p-1">
										CAT 1 (STANDING): S$118
									</p>
									<p className="text-white text-base p-1">
										CAT 2 (STANDING): S$108
									</p>
									<p className="text-white text-base p-1">CAT 3: S$88</p>
									<p className="text-white text-base p-1">CAT 4: S$78</p>
									<p className="text-white text-base p-1">CAT 5: S$72</p>
									<p className="text-white text-base p-1">VIP: S$160</p>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
