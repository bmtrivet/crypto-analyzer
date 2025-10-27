"use client";

import Image from "next/image";
import { PairItemProps } from "./types";

export const PairItem = ({ pair }: PairItemProps) => {
    return (
        <div>
            <div className='w-8 h-8 relative rounded-full overflow-hidden'>
                <Image fill src={pair.imageUrl} alt={pair.mainCoinName} />
            </div>
            <div>
                <span>
                    {pair.mainCoinName}/{pair.relativeCoinName}
                </span>
            </div>
        </div>
    );
};
