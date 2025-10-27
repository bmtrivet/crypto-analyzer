"use client";

import { PairItem } from "../PairItem";
import { PairListProps } from "./types";

export const PairList = (props: PairListProps) => {
    const { pairs } = props;

    return (
        <div className='mt-10 flex flex-col gap-2'>
            {pairs.map(pair => {
                return <PairItem key={pair.instId} pair={pair} />;
            })}
        </div>
    );
};
