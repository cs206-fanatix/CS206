import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const TicketDetail: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const ticket = {
        id:1,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium"
    }
    
    return(
        <div className="flex flex-col h-screen w-full bg-primary">
            <div>
                <div>
                    <div className="w-full h-56 relative overflow-hidden">
                        <Image src="/static/images/zankyosanka-photo.jpg" layout="fill" className="object-cover absolute opacity-50"></Image>
                    </div>
                    <div>
                        <Image src="/../public/static/images/ticket.png" width={100} height={100}></Image>
                        <Image src=""></Image>
                            <div>
                                <h2>Born Pink world tour</h2>
                                <h3>Blackpink</h3>
                                <h3>not listed</h3>
                                <input placeholder="List Price (SGD)"></input>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
                            </div>
                    </div>
                </div>
                <div>
                <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
                </div>
            </div>
        </div>
        
    )
}

export default TicketDetail