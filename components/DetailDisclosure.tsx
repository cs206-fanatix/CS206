import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface props{
    key: number,
    icon: string,
    title: string,
    content: string
}

const DetailDisclosure = (props: props) => {
    let key = 1
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full rounded-lg bg-blue-900 px-4 py-2 z-1 text-left text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-900 focus-visible:ring-opacity-75">
                        <div className="flex items-center">
                            <span className="material-symbols-outlined pr-1">
                                {props.icon}
                            </span>
                            <span>{props.title}</span>
                        </div>

                        <ChevronDownIcon
                            className={`${open ? 'rotate-180 transform' : ''
                                } h-5 w-5 ml-auto mt-1 text-white`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-3 -mt-5 text-sm text-white bg-secondary rounded-b-lg">
                        {
                            props.content.split('\n').map((paragraph)=>{
                                return <p key={key++} className='p-1 text-base'>{paragraph}</p>
                            })
                        }
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default DetailDisclosure