'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PromptCard from "@components/PromptCard";
import {NextUIProvider} from "@node_modules/@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import {Grid}   from "@nextui-org/react";


const POST =  () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const pathname = usePathname()
    const postcode = pathname.split('/')[2]
    const [page, setPage] = useState(1)
    const [cardPerPage, setCardPerPage] = useState(10)
    const indexOfLastCard = page * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard)


    useEffect(() => {
        fetch(`/api/search/${postcode}`)
            .then((res) => res.json()).then((data) => {
            setData(data.restaurants)

            setLoading(false)
        })
    }, [])

    if (isLoading) return  <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
    />
    if (!data) return <p>No profile data</p>





    return (
        <NextUIProvider>
            <div className="p-2 max-w-8xl">
                <section className="grid grid-cols-5 grid-rows-2 gap-2 grid-flow-row" >
                    {currentCards.map((restaurant) => (<PromptCard data={restaurant} />))}
                </section>
            </div>
            <div className="py-4 w-full flex-center">
                <Pagination total={Math.ceil(data.length/cardPerPage)} initialPage={1} onChange={setPage} />
            </div>
        </NextUIProvider>
    )
}



const  Page =  () => {
    return POST();

}

export default Page;


