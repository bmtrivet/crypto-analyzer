"use client";

import { PairItem } from "./PairItem";
import { PairListProps } from "./types";

export const PairList = (props: PairListProps) => {
    const { pairs } = props;

    return (
        <div>
            {pairs.map(pair => {
                return <PairItem key={pair.instId} pair={pair} />;
            })}
        </div>
    );
};
