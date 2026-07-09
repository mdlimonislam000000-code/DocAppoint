'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaCashRegister, FaHome, FaStethoscope, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { LuLogIn } from 'react-icons/lu';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user
    console.log(user)

    const handleSingOut = async () => {
        await authClient.signOut();
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className='sticky top-0 z-50 w-full bg-amber-50 shadow-sm relative'>

            <div className='grid grid-cols-3 md:flex md:justify-between container items-center mx-auto p-5'>

                <div className='flex items-center md:hidden'>
                    <button onClick={toggleMenu} className='text-gray-700 focus:outline-none text-xl sm:text-2xl'>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <div className='flex items-center justify-center md:justify-start gap-3 col-span-1'>
                    <FaStethoscope className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                    <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent whitespace-nowrap">
                        DocAppoint
                    </span>
                </div>

                <div className='hidden md:flex gap-5'>
                    <Link href={'/'} className={`flex gap-1 items-center ${pathname === '/' ? 'text-blue-600 font-bold' : ''}`} >
                        <FaHome />
                        <p>Home</p>
                    </Link>

                    <Link href={'/doctors'} className={`flex gap-1 items-center ${pathname === '/doctors' ? 'text-blue-600 font-bold' : ''}`}>
                        <IoDocumentText />
                        <p>All Appointments</p>
                    </Link>

                    <Link href={'/dashboard'} className={`flex gap-1 items-center ${pathname === '/dashboard' ? 'text-blue-600 font-bold' : ''}`}>
                        <MdOutlineDashboardCustomize />
                        <p>Dashboard</p>
                    </Link>
                </div>

                <div className='flex justify-end items-center gap-2 sm:gap-4'>

                    {/* <Link href={'/dashboard/profile'} className={`hidden md:block ${pathname === '/dashboard/profile' ? 'text-blue-600 font-bold' : ''}`}>
                        <p>profile</p>
                    </Link> */}

                    {user ? (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div>
                                <Link href={'/dashboard/profile'}>
                                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                        <Avatar.Image referrerPolicy='no-referrer' alt="John Doe" src={user?.image} />
                                        <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                                    </Avatar>
                                </Link>
                            </div>

                            <div>
                                <Button className={'rounded-none text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2'} onClick={handleSingOut} variant='danger'>LogOut</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link href={'/login'} className={`flex gap-1 items-center text-xs sm:text-sm ${pathname === '/login' ? 'text-blue-600 font-bold' : ''}`}>
                                <LuLogIn className="text-base sm:text-xl" />
                                <p className="hidden sm:block">Login</p>
                            </Link>

                            <Link href={'/register'} className={`flex gap-1 items-center text-xs sm:text-sm ${pathname === '/register' ? 'text-blue-600 font-bold' : ''}`}>
                                <FaCashRegister className="text-base sm:text-xl" />
                                <p className="hidden sm:block">Register</p>
                            </Link>
                        </div>
                    )}

                </div>
            </div>

            {isOpen && (
                <div className='absolute left-5 top-[65px] w-52 bg-white p-2 rounded-xl border border-amber-100 shadow-xl flex flex-col gap-1 md:hidden z-50 transition-all'>

                    <Link href={'/'} onClick={toggleMenu} className={`flex gap-2 items-center px-3 py-2 rounded-lg text-sm transition-colors ${pathname === '/' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700 hover:bg-amber-50/60'}`} >
                        <FaHome className="text-base shrink-0" />
                        <p>Home</p>
                    </Link>

                    <Link href={'/doctors'} onClick={toggleMenu} className={`flex gap-2 items-center px-3 py-2 rounded-lg text-sm transition-colors ${pathname === '/doctors' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700 hover:bg-amber-50/60'}`}>
                        <IoDocumentText className="text-base shrink-0" />
                        <p>All Appointments</p>
                    </Link>

                    <Link href={'/dashboard'} onClick={toggleMenu} className={`flex gap-2 items-center px-3 py-2 rounded-lg text-sm transition-colors ${pathname === '/dashboard' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700 hover:bg-amber-50/60'}`}>
                        <MdOutlineDashboardCustomize className="text-base shrink-0" />
                        <p>Dashboard</p>
                    </Link>

                    <Link href={'/dashboard/profile'} onClick={toggleMenu} className={`flex gap-2 items-center px-3 py-2 rounded-lg text-sm transition-colors ${pathname === '/dashboard/profile' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700 hover:bg-amber-50/60'}`}>
                        <FaUserCircle className="text-base shrink-0" />
                        <p>Profile</p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;