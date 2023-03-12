import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import QRCode from 'react-qr-code'

interface props {
	icon: string,
    header: string,
    content: string
}

const DisclosureElement = (props :props) => {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75">
						<div className="flex items-center">
							<span className="material-symbols-outlined pr-1">{props.icon}</span>
							<span>{props.header}</span>
						</div>
						<ChevronDownIcon
							className={`${
								open ? 'rotate-180 transform' : ''
							} h-5 w-5 ml-auto text-white`}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-secondary">
						<div className="pt-2">
							<div dangerouslySetInnerHTML={{__html: props.content}}></div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default DisclosureElement;
