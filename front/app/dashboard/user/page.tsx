import React from 'react';
import Image from 'next/image';

export default function Page() {
    return (
        <div className='flex flex-col w-full gap-6'>

            <div className='flex flex-row gap-5'>
                <div className='w-[20%]'>
                    <Image
                        src="/images/placeholder-avatar.jpg"
                        width={200}
                        height={200}
                        className="h-full w-full rounded-md object-cover"
                        alt=""
                    />
                </div>

                <div className='w-full'>

                    <div className='border rounded-md p-8 space-y-10'>

                        <div className='flex justify-between'>

                            <div className='flex flex-col'>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Nom complet</h2>
                                <h3 className='font-bold text-2xl text-blue-600'>John Doe</h3>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>NPI</h2>
                                <h3 className='font-bold text-2xl text-blue-600'>0123456789</h3>
                            </div>
                        </div>


                        <div className='flex w-full justify-between gap-5'>

                            <div className='flex flex-col '>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Date de naissance</h2>
                                <h3 className='font-semibold text-md'> 02/05/1991 </h3>
                                {/* <h3 className='font-semibold text-md'> 33 ans </h3> */}
                            </div>
                            <div className='flex flex-col '>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Adresse</h2>
                                <h3 className='font-semibold text-md'> Quartier Adjina, Porto-Novo </h3>
                            </div>
                            <div className='flex flex-col '>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Contact</h2>
                                <h3 className='font-semibold text-md'> +229 99 98 97 96 </h3>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-5'>
                <div className='w-[20%] flex flex-col'>
                    <div className='flex flex-col space-y-2 pt-5'>
                        <h2 className='text-xs uppercase font-bold text-gray-400'>A rejoint la plateforme</h2>
                        <h3 className='font-semibold text-md'> 05/12/2024 </h3>
                    </div>

                    <div className='flex flex-col space-y-2 pt-5'>
                        <h2 className='text-xs uppercase font-bold text-gray-400'>Ajouté par</h2>
                        <h3 className='font-semibold text-md'> Gael </h3>
                    </div>
                </div>

                <div className='flex flex-col w-full'>

                    <div className='flex flex-col rounded-md bg-gray-50 p-8'>

                        <div className='flex w-full justify-between gap-5'>

                            <div className='flex flex-col'>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Type de handicap</h2>
                                <h3 className='font-semibold text-md'> Moteur </h3>
                            </div>
                            <div className='flex flex-col '>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Niveau de handicap</h2>
                                <h3 className='font-semibold text-md'> Modéré </h3>
                            </div>
                            <div className='flex flex-col '>
                                <h2 className='text-xs uppercase font-bold text-gray-400'>Diagnostiqué par</h2>
                                <h3 className='font-semibold text-md'> Dr House </h3>
                            </div>

                        </div>

                    </div>

                </div>

            </div>




        </div>
    );
}
