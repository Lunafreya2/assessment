"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PromptCard from "@components/PromptCard";
import {NextUIProvider} from "@nextui-org/react";



//error handling for wrong postcode/what if api not available 500

//testcases
//write the requiremetns
//
// mirror all of the roles (PM, etc look them up)
//
// when you're having a discussiion, listen and then give ideas,
//
// never do anything solo in a team
//edgecases
//what if the user enters a wrong postcode
//what if the user enters a postcode that doesn't have any restaurants
//storyboaard



const Home = () => {
    const [submitting, setSubmitting] = useState(false);
    const [postcode, setPostcode] = useState({ postcode: ''});
    const router = useRouter();

    const search = (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let cleanedPostcode = postcode.postcode.replace(/\s/g, '');
            router.push(`/search/${cleanedPostcode}`);
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
            <br/>
            <form className="mt-10 w-full max-w-2xl flex flex-col gap-3 glassmorphism" onSubmit={search}>
                <label className="font-satoshi font-semibold text-base text-gray-700">
                    <span>Find Nearby Restaurants</span>
                    <input className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 h-[50px]" required value={postcode.postcode} onChange={(e) => setPostcode({...postcode, postcode: e.target.value})} placeholder="Enter your postcode"></input>
                </label>

                <div>
                    <button className=" bg-primary-orange text-white rounded-lg p-2 text-sm font-semibold"
                            type="submit" disabled={submitting}> Search
                    </button>
                </div>

            </form>


        </section>
    )
}

export default Home;