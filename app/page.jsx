"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PromptCard from "@components/PromptCard";
import {NextUIProvider} from "@nextui-org/react";

//pagination
//filters
//logos and placards
//search again on nav based on page??
//grids for serach page
//error handling for wrong postcode

const Home = () => {
    const [submitting, setSubmitting] = useState(false);
    const [postcode, setPostcode] = useState({ postcode: ''});
    const router = useRouter();

    const search = (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            router.push(`/search/${postcode.postcode}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Takeaway Coding Assignment
            </h1>
            <span className="orange_gradient text-center text-xl">Saad Khalil</span>
            <p>
                This is a coding assignment for Takeaway.com
            </p>
            <br/>
            <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={search}>
                <label className="font-satoshi font-semibold text-base text-gray-700">
                    <span>Find Nearby Restaurants</span>
                    <input className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 h-[50px]" required value={postcode.postcode} onChange={(e) => setPostcode({...postcode, postcode: e.target.value})} placeholder="Enter your postcode"></input>
                </label>

                <div>
                    <button className=" bg-primary-orange text-white rounded-lg p-3 text-sm font-semibold"
                            type="submit" disabled={submitting}> Search
                    </button>
                </div>

            </form>


        </section>
    )
}

export default Home;