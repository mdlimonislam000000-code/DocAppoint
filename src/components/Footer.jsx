'use client'
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaHome, FaInstagram, FaLinkedinIn, FaStethoscope, FaTwitterSquare } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='mt-5 container mx-auto bg-amber-100 p-9'>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6'>
                <div>
                    <div className='flex items-center gap-3'>
                        <FaStethoscope className="h-7 w-7 text-blue-600" />
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                            DocAppoint
                        </span>
                    </div>
                    <div>
                        <p className='text-[1.1rem] w-full md:w-84 mt-3 text-[#43414189]'>
                            Your trusted doctor appointment manager. Easily find doctors and book quickly.
                        </p>
                    </div>
                </div>

                <div>
                    <div>
                        <h1 className='font-bold text-2xl'>Quick Links</h1>
                    </div>
                    <div className='mt-3 space-y-2'>
                        <Link href={'/'} className='flex gap-2 items-center ' >
                            <FaHome />
                            <p >Home</p>
                        </Link>

                        <Link href={'/doctors'} className='flex gap-2 items-center '>
                            <IoDocumentText />
                            <p>All Appointments</p>
                        </Link>

                        <Link href={'/dashboard'} className='flex gap-2 items-center '>
                            <MdOutlineDashboardCustomize />
                            <p>Dashboard</p>
                        </Link>
                    </div>
                </div>

                <div>
                    <div>
                        <p className='font-bold text-2xl '>Social Links</p>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-2 gap-2 mt-4 '>
                        <p className='flex items-center gap-1'>
                            <FaFacebook />
                            <span>Facebook</span>
                        </p>
                        <p className='flex items-center gap-1'>
                            <FaTwitterSquare />
                            <span>Twitter</span>
                        </p>
                        <p className='flex items-center gap-1'>
                            <FaInstagram />
                            <span>Instagram</span>
                        </p>
                        <p className='flex items-center gap-1'>
                            <FaLinkedinIn />
                            <span>LinkDin</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;