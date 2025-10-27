"use client";

import Image from "next/image";
import { PairItemProps } from "./types";

export const PairItem = ({ pair }: PairItemProps) => {
    return (
        <div>
            <Image width={50} height={50} src={pair.imageUrl} alt={pair.mainCoinName} />
            <div>
                <span>
                    {pair.mainCoinName}/{pair.relativeCoinName}
                </span>
            </div>
        </div>
    );
};
