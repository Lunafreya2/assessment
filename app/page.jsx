"use client";
import Form from "@components/Form";
import { useState } from "react";

const Home = () => {
    const [submitting, setSubmitting] = useState(false);
    const [postcode, setPostcode] = useState({ postcode: ''});

    const search = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode.postcode}`);
            const data = await response.json();
            console.log(data);
            alert("Data fetched successfully")
            setSubmitting(false);

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