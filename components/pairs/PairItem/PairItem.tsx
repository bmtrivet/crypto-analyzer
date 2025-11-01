"use client";

import Image from "next/image";
import { PairItemProps } from "./types";
import Link from "next/link";

export const PairItem = ({ pair }: PairItemProps) => {
    return (
        <tr key={pair.instId}>
            <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                    <div className='w-6 h-6 relative rounded-full overflow-hidden'>
                        <Image fill src={pair.imageUrl} alt={pair.mainCoinName} />
                    </div>
                    <div className='ml-4'>
                        <div className='text-sm'>{pair.instId}</div>
                    </div>
                </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-right'>
                <div className='text-sm'>${(+pair.last).toFixed(2)}</div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-right'>
                <div className='text-sm '>${(+pair.high24h).toFixed(2)}</div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-right'>
                <div className='text-sm '>${(+pair.low24h).toFixed(2)}</div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-right'>
                <div className='text-sm '>${(+pair.volCcy24h / 1000000).toFixed(2)}M</div>
            </td>
            <td className='text-right'>
                <Link
                    href={`/pairs/details/?pair=${pair.instId.toLowerCase()}`}
                    className='cursor-pointer bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 active:bg-yellow-600 transition-all duration-200'
                >
                    Details
                </Link>
            </td>
        </tr>
    );
};
