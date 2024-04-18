'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const POST =  () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const pathname = usePathname()
    const postcode = pathname.split('/')[2]
    useEffect(() => {
        fetch(`/api/search/${postcode}`)
            .then((res) => res.json()).then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return JSON.stringify(data)
}

const  Page =  () => {
    return POST();

}

export default Page;


