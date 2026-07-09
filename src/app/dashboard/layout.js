'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Avatar } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const { data } = authClient.useSession();
    const loggedInUser = data?.user;
    const pathname = usePathname();

    const userImage = loggedInUser?.image || loggedInUser?.avatar || null;
    console.log(userImage, "limon")

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

            <aside className="w-full md:w-64 bg-white shadow-md p-5 flex flex-col justify-between gap-4 md:gap-0">
                <div className="flex flex-col sm:flex-row md:flex-col sm:items-center md:items-start sm:justify-between md:justify-start w-full">

                    <div className="w-full sm:w-auto md:w-full">
                        <h2 className="text-xl font-bold text-blue-600 mb-4 md:mb-6">Dashboard</h2>

                        {loggedInUser && (
                            <div className="hidden md:flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
                                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                    <Avatar.Image referrerPolicy='no-referrer' alt="John Doe" src={userImage} />
                                    <Avatar.Fallback>{loggedInUser.name[0]}</Avatar.Fallback>
                                </Avatar>

                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-gray-800 truncate">{loggedInUser.name}</span>
                                    <span className="text-xs text-gray-500 truncate">{loggedInUser.email}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <nav className="flex flex-row md:flex-col gap-2 w-full sm:w-auto md:w-full overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
                        <Link
                            href="/dashboard/my-booking"
                            className={`px-3 py-1 md:px-4 md:py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${pathname === '/dashboard/my-booking'
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Button className={'rounded-lg p-0 min-w-0 h-auto bg-transparent text-current'} variant='none'>My Booking</Button>
                        </Link>

                        <Link
                            href="/dashboard/profile"
                            className={`px-3 py-1 md:px-4 md:py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${pathname === '/dashboard/profile'
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Button className={'rounded-lg p-0 min-w-0 h-auto bg-transparent text-current'} variant='none'>Profile</Button>
                        </Link>
                    </nav>
                </div>

                <div className="hidden md:block pt-4 border-t border-gray-100 w-full">
                    <button
                        onClick={() => authClient.signOut()}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-4 sm:p-6 md:p-8">
                {children}
            </main>
        </div>
    );
}