import React from 'react';
import Header from '@/components/header';
import Image from "next/image";
import Footer from "@/components/footer";

const tempContent = [
    {
        "title": "Title 1",
        "excerpt": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, unde?"
    },
    {
        "title": "Title 2",
        "excerpt": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, unde?"
    },
    {
        "title": "Title 3",
        "excerpt": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, unde?"
    },
    {
        "title": "Title 4",
        "excerpt": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, unde?"
    },
    {
        "title": "Title 5",
        "excerpt": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, unde?"
    },
    {
        "title": "Title 6",
        "excerpt": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, unde?"
    },
]

export default function Blog() {
    return (

        <>
            <Header />

            <main className="mt-16 p-3">

                <div className="relative flex justify-center items-center overflow-hidden rounded-xl relative h-96">
                    <Image
                        src="/images/blog-img.jpg"
                        alt="Blog"
                        className="object-cover"
                        fill
                    />
                    <h4 className="absolute mb-2 block font-sans text-4xl font-bold leading-snug tracking-normal text-white antialiased">
                        Blog
                    </h4>
                </div>

                <div className='flex flex-col items-center justify-center min-h-screen w-full space-y-20 pt-20 pb-20'>

                    {/* <div className='flex items-center justify-center min-h-[40vh] bg-blue-500 w-full'>
                    <h4 className="mb-2 block font-sans text-4xl font-semibold leading-snug tracking-normal text-white antialiased">
                        Blog
                    </h4>
                </div> */}

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-16 w-8/12'>

                        {
                            tempContent && tempContent.map((item, index) => (
                                <div key={index} className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                    <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                                    </div>
                                    <div className="p-6">
                                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                            {item.title}
                                        </h5>
                                        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </main>


            <Footer />
        </>


    );
}
