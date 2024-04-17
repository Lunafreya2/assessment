"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react';

const Nav = () => {
    return (
        <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center"> 
            <Image src="/assets/icons/TakeawayLogo.svg.png" alt="Takeaway.com" width={30} height={30} className = "object-contain" />
        </Link>
            <div className="">
                <div className="flex gap-3 md:gap-5">
                    <Link href="/about" className="flex-center outline_btn">About</Link>
                </div>


            </div>
        </nav>
    )
}
export default Nav;