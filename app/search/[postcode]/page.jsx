'use client';
import { useEffect, useState } from 'react';
import {usePathname, useRouter} from 'next/navigation';
import PromptCard from "@components/PromptCard";
import {NextUIProvider} from "@node_modules/@nextui-org/react";
import {Pagination, Skeleton} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import Sidebar from "@components/SideBar";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";



const POST =  () => {
    const [data, setData] = useState([])
    const [cusines, setCusines] = useState([])
    const [isLoading, setLoading] = useState(true)
    const pathname = usePathname()
    const postcode = pathname.split('/')[2]
    const [page, setPage] = useState(1)
    const [cardPerPage, setCardPerPage] = useState(10)
    const indexOfLastCard = page * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard)
    // const [selectedCuisine, setSelectedCuisine] = useState(null)
    // const [selectedRating, setSelectedRating] = useState(null)
    const [sortedData, setSortedData] = useState([]);
    const router = useRouter();
    const [postcodeForSearch, setPostcode] = useState({ postcode: ''});



    useEffect(() => {
        fetch(`/api/search/${postcode}`)
            .then((res) => res.json()).then((data) => {
            setData(data.restaurants)
            setCusines(data.metaData.cuisineDetails)
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


    const scrollToTop = (page) => {
        setPage(page)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // This provides a smooth scrolling effect
        });
    };


    function handleSubmit(e) {
        e.preventDefault();
        try {
            let cleanedPostcode = postcodeForSearch.postcode.replace(/\s/g, '');
            router.push(`/search/${cleanedPostcode}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NextUIProvider className="w-10/12">
            <div className="flex items-center justify-between py-2">
                <Breadcrumbs >
                    <BreadcrumbItem size="lg">Search</BreadcrumbItem>
                    <BreadcrumbItem size="lg">{postcode.toUpperCase()}</BreadcrumbItem>
                </Breadcrumbs>
                <form onSubmit={handleSubmit} className="flex flex-row">
                    <Input size={"sm"} value={postcodeForSearch.postcode} type="text" onChange={(e) => setPostcode({...postcodeForSearch, postcode: e.target.value})} placeholder={postcode.toUpperCase()} isRequired="true"/>
                    <Button size={"sm"} type="submit">
                        Search
                    </Button>
                </form>

            </div>
            <div className="grid grid-cols-2 gap-2">
                {/*<Sidebar cuisines={cusines} setSelectedCuisine={setSelectedCuisine} />*/}
                {currentCards.map((restaurant) => (<Skeleton className="rounded-3xl" isLoaded={!isLoading}><PromptCard data={restaurant} /></Skeleton>))}
            </div>
            <div className="py-4 w-full flex-center">
                <Pagination total={Math.ceil(data.length/cardPerPage)} initialPage={1} onChange={scrollToTop} />
            </div>
        </NextUIProvider>
    )
}



const  Page =  () => {
    return POST();

}

export default Page;


