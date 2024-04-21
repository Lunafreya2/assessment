"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import {Snippet} from "@nextui-org/react";

const Nav = () => {
    return (
        <nav className="flex-between w-full mb-5 pt-3">
        <Link href="/" className="flex gap-2 flex-center"> 
            <Image src="/assets/icons/TakeawayLogo.svg.png" alt="Takeaway.com" width={30} height={30} className = "object-contain" />
        </Link>
        <Link href="https://github.com/Lunafreya2/assessment" className="flex-center"><Snippet hideCopyButton={true}>github</Snippet></Link>


        </nav>
    )
}
export default Nav;