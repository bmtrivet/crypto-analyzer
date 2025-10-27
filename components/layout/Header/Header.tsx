"use client";

import Link from "next/link";

export const Header = () => {
    return (
        <header className='bg-gray-800 text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='text-xl font-bold mb-2 md:mb-0'>
                <Link href='/'>Crypto App</Link>
            </div>

            <nav>
                <Link href='/pairs' className='hover:text-yellow-400'>
                    Pairs
                </Link>

                <Link href='/about' className='hover:text-yellow-400'>
                    About
                </Link>
            </nav>
        </header>
    );
};
