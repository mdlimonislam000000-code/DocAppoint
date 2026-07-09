'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import React from 'react';
import { FaCashRegister, FaHome, FaStethoscope } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { LuLogIn } from 'react-icons/lu';
import { MdOutlineDashboardCustomize } from 'react-icons/md'; 

const Navbar = () => {
    const pathname = usePathname();

    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user
    console.log(user)

    const handleSingOut = async ()=>{
        await authClient.signOut();
    }

    return (
        <div className=' sticky top-0 z-50 flex justify-between container items-center mx-auto p-5 bg-amber-50'>
            <div className='flex items-center gap-3'>
                <FaStethoscope className="h-7 w-7 text-blue-600" />
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    DocAppoint
                </span>
            </div>
            
            <div className='flex gap-5'>
               
                <Link href={'/'} className={`flex gap-1 items-center ${pathname === '/' ? 'text-blue-600 font-bold' : ''}`} >
                    <FaHome />
                    <p>Home</p>
                </Link>

                <Link href={'/allAppointments'} className={`flex gap-1 items-center ${pathname === '/allAppointments' ? 'text-blue-600 font-bold' : ''}`}>
                    <IoDocumentText />
                    <p>All Appointments</p>
                </Link>

                <Link href={'/dashboard'} className={`flex gap-1 items-center ${pathname === '/dashboard' ? 'text-blue-600 font-bold' : ''}`}>
                    <MdOutlineDashboardCustomize />
                    <p>Dashboard</p>
                </Link>
            </div>
            
            <div className='flex justify-around items-center gap-4'>
                
                <Link href={'/dashboard/profile'} className={`${pathname === '/dashboard/profile' ? 'text-blue-600 font-bold' : ''}`}>
                    <p>profile</p>
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        <div>
                            <Avatar>
                                <Avatar.Image referrerPolicy='no-referrer' alt="John Doe" src={user?.image} />
                                <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                            </Avatar>
                        </div>

                        <div>
                            <Button className={'rounded-none'} onClick={handleSingOut} variant='danger'>LogOut</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">

                        <Link href={'/login'} className={`flex gap-1 items-center ${pathname === '/login' ? 'text-blue-600 font-bold' : ''}`}>
                            <LuLogIn />
                            <p>Login</p>
                        </Link>

                        <Link href={'/register'} className={`flex gap-1 items-center ${pathname === '/register' ? 'text-blue-600 font-bold' : ''}`}>
                            <FaCashRegister />
                            <p>Register</p>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;