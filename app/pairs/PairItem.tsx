"use client";

import React from "react";
import { PairItemProps } from "./types";
import Image from "next/image";

export const PairItem = ({ pair }: PairItemProps) => {
    return (
        <div>
            {pair.imageUrl ? (
                <Image width={50} height={50} src={pair.imageUrl} alt={pair.mainCoinName} />
            ) : null}
            <div>
                <span>
                    {pair.mainCoinName}/{pair.relativeCoinName}
                </span>
            </div>
        </div>
    );
};
