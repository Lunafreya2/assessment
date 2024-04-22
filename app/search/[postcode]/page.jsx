'use client';
import { useEffect, useState } from 'react';
import {usePathname, useRouter} from 'next/navigation';
import PromptCard from "@components/PromptCard";
import {NextUIProvider} from "@node_modules/@nextui-org/react";
import {Pagination, Skeleton} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";


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
    const [sortedData, setSortedData] = useState([]);
    const router = useRouter();
    const [postcodeForSearch, setPostcode] = useState({ postcode: ''});


    /**
     * useEffect hook for fetching restaurant data based on postcode.
     * This hook runs once after the component mounts (due to the empty dependency array).
     *
     * The fetch request is made to the `/api/search/${postcode}` endpoint.
     *
     * The response from the fetch request is then converted to JSON.
     *
     * The JSON data is then used to update the state of the component:
     * - The `restaurants` property of the data is used to update the `data` state.
     * - The `cuisineDetails` property of the `metaData` property of the data is used to update the `cusines` state.
     * - The `setLoading` function is called with `false` to indicate that the data has finished loading.
     */
    useEffect(() => {
        fetch(`/api/search/${postcode}`)
            .then((res) => res.json()).then((data) => {
            setData(data.restaurants === undefined ? [] : data.restaurants)
            setCusines(data.metaData === undefined ? [] : data.metaData.cuisineDetails)
            setLoading(false)
        })
    }, [])


    if (isLoading) return  <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
    />

    if (data.length === 0) {
        return <Modal defaultOpen={true}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
                <ModalBody>
                    <p className="text-center">
                        No restaurants found for the postcode: {postcode.toUpperCase()}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color={"danger"} onClick={() => router.push('/')}>Search Again</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    }

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
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2">
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


