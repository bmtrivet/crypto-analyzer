"use client";

import { PairItem } from "../PairItem";
import { PAIRS_TABLE_COLUMNS } from "./constants";
import { PairListProps } from "./types";

export const PairList = (props: PairListProps) => {
    const { pairs } = props;

    return (
        <div className='bg-bg-primary rounded-lg shadow-lg overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className=''>
                        <tr>
                            {PAIRS_TABLE_COLUMNS.map((column, index) => {
                                const isFirstItem = index === 0;
                                return (
                                    <th
                                        key={column}
                                        className={`${
                                            isFirstItem ? "text-left" : "text-right"
                                        } px-6 py-4 text-xs font-medium uppercase`}
                                    >
                                        <div className=''>
                                            <span>{column}</span>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {pairs.map(pair => (
                            <PairItem key={pair.instId} pair={pair} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
