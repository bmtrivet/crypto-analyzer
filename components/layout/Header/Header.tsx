import Link from "next/link";

export const Header = () => {
    const links = [
        {
            name: "Pairs",
            url: "/pairs",
        },
        {
            name: "About",
            url: "/about",
        },
    ];

    return (
        <header className='bg-gray-950 py-5 px-20 gap-10 flex items-center w-full'>
            <div className='text-white uppercase text-[28px]'>
                <Link href='/'>Crypto App</Link>
            </div>

            <nav className='flex items-center gap-4'>
                {links.map(link => {
                    return (
                        <Link className='text-white' key={link.name} href={link.url}>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
};
