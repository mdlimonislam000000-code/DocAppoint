import BookingCard from '@/components/BookingCard';
import { auth } from '@/lib/auth';
import { Button, Card } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { CiHospital1 } from 'react-icons/ci';
import { FaLocationArrow, FaRegStar } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';

export const metadata = {
    title: " Doctors Details | DocAppointment  ",
    description: "...",
    icons: {
        icon: '/doctor-icon.svg'
    },
}

const DoctorsDetails = async ({ params }) => {
    const { id } = await params;

    try {
        const token = await auth.api.getToken({
            headers: await headers()
        })
    }catch(error){
         redirect('/login');
    }

    // console.log(token)
    // if (!token) {
       
    // }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors/${id}`, {
        headers: {
            authorization: `Bearer ${token?.token || token}`
        }
    });
    const doctors = await res.json();

    const { image, name, availability, specialty, experience, hospital, fee, rating, description, location } = doctors;

    return (
        <div className='flex flex-col md:flex-row items-stretch gap-7 max-w-5xl mx-auto px-4 mt-8'>

            <div className="w-full md:w-[350px] min-h-[350px] md:min-h-full relative rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                <Image
                    src={image}
                    alt='Doctor Image'
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
            </div>

            <Card className='flex-1 p-6 flex flex-col justify-between gap-5 bg-white border border-gray-100/50 shadow-sm rounded-2xl'>

                <div className="space-y-4">
                    <div>
                        <p className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">{specialty}</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{name}</p>
                    </div>

                    <div className='flex items-center gap-10 border-b border-gray-100 pb-3'>
                        <p className="text-gray-600 font-medium text-lg">Visit: <span className="font-bold text-gray-900">{fee} Taka</span></p>
                        <span className='flex items-center gap-2 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200'>
                            <FaRegStar className='text-amber-500 text-lg' />
                            <p className='font-bold text-gray-800 text-base mt-[1px]'>{rating}</p>
                        </span>
                    </div>

                    {/* Available Time */}
                    <div className="flex flex-col gap-1 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <p className="font-bold text-gray-600 text-sm mb-1">Available Time:</p>
                        <p className="text-xs text-gray-700 font-semibold pl-2 border-l-2 border-cyan-500">
                            {availability && availability[0] ? availability[0] : "Not Available"}
                        </p>
                        {availability && availability[1] && (
                            <p className="text-xs text-gray-700 font-semibold pl-2 border-l-2 border-cyan-500">
                                {availability[1]}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className='text-sm text-gray-600 leading-relaxed'>
                        <p className="font-bold text-gray-700 text-base">Description :</p>
                        <p className="mt-1">{description}</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch'>

                        <Button className="w-full rounded-xl flex items-center justify-start gap-4 py-7 px-4 border border-gray-200" variant="outline">
                            <IoIosTimer className="!text-3xl !w-8 !h-8 flex-shrink-0 text-cyan-600 !stroke-[3]" />
                            <div className="text-left min-w-0">
                                <p className="text-xs text-gray-400 font-bold">Experience :</p>
                                <p className="text-sm text-gray-800 !font-extrabold mt-0.5 truncate">{experience}</p>
                            </div>
                        </Button>

                        <Button className="w-full rounded-xl flex items-center justify-start gap-4 py-7 px-4 border border-gray-200" variant="outline">
                            <CiHospital1 className="!text-3xl !w-8 !h-8 flex-shrink-0 text-cyan-600 !stroke-[2]" />
                            <div className="text-left min-w-0 flex-1">
                                <p className="text-xs text-gray-400 font-bold">Hospital :</p>
                                <p className="text-sm text-gray-800 !font-extrabold mt-0.5 break-words line-clamp-1">{hospital}</p>
                            </div>
                        </Button>

                        <Button className="w-full rounded-xl flex items-center justify-start gap-4 py-7 px-4 border border-gray-200" variant="outline">
                            <FaBangladeshiTakaSign className="!text-2xl !w-8 !h-8 flex-shrink-0 text-cyan-600" />
                            <div className="text-left min-w-0">
                                <p className="text-xs text-gray-400 font-bold">Appointment fee :</p>
                                <p className="text-sm text-gray-800 !font-extrabold mt-0.5">{fee} Taka</p>
                            </div>
                        </Button>

                        <Button className="w-full rounded-xl flex items-center justify-start gap-4 py-7 px-4 border border-gray-200" variant="outline">
                            <FaLocationArrow className="!text-2xl !w-8 !h-8 flex-shrink-0 text-cyan-600" />
                            <div className="text-left min-w-0 flex-1">
                                <p className="text-xs text-gray-400 font-bold">Location :</p>
                                <p className="text-sm text-gray-800 !font-extrabold mt-0.5 break-words line-clamp-1">{location}</p>
                            </div>
                        </Button>

                    </div>

                    <div>
                        <BookingCard doctors={doctors}></BookingCard>
                    </div>
                </div>

            </Card>
        </div>
    );
};

export default DoctorsDetails;