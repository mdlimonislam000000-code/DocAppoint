import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const DoctorsCard = ({ doctor }) => {
    const { image, name, _id, specialty, experience, hospital, fee, rating } = doctor
    return (
        <div className='mt-5'>
            <Card className='rounded-none'>
                <div className="relative w-full h-[230px] overflow-hidden bg-gray-50">
                    <Image
                        src={image}
                        alt={`${name}'s picture`}
                        fill
                        className="object-cover" // w-full h-full এখানে আর লাগবে না, object-cover একাই সাইজ ঠিক রাখবে
                        sizes="(max-width: 768px) 100vw, 320px"
                    />
                </div>
                <div>
                    <p className='text-center font-bold text-2xl text-[#232222cf]'>{name}</p>
                </div>
                <div className='flex items-center justify-between mx-8'>
                    <span className='flex gap-2 items-center'>
                        <p className='font-semibold'>Specialty:</p>
                        <p className="text-sm text-cyan-600 font-semibold"> {specialty}</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <p className='text-[#f3bd2a] font-bold text-2xl'><FaRegStar /></p>
                        <p className='font-bold text-[1.2rem]'>{rating}</p>
                    </span>
                </div>
                <div className='flex justify-between items-center mx-7'>
                    <p className=" font-bold text-gray-600 ">Hospital : {hospital}</p>
                </div>
                <div className='flex items-center justify-between mx-7'>
                    <span className="font-bold text-gray-500">{experience} Exp</span>
                    <span className="font-bold text-[1.1rem] text-gray-900">Fee: {fee} taka</span>
                </div>

                <Link href={`/allAppointments/${_id}`}>
                    <Button className={'w-full rounded-none '}>View Details</Button>
                </Link>
            </Card>
        </div>
    );
};

export default DoctorsCard;