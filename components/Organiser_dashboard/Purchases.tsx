import Link from 'next/link'

interface props {
    image: string,
    username: string,
    event: string,
    profit: string
}

const Purchases = (props: props) => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={props.image}/>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {props.username}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {props.event}
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                ${props.profit}
            </div>
        </div>
    );
};

export default Purchases;