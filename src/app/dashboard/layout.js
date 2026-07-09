'use client'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const { data } = authClient.useSession();
    const loggedInUser = data?.user;
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-6">Dashboard</h2>

                    {loggedInUser && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
                            {loggedInUser.image ? (
                                <img
                                    src={loggedInUser.image}
                                    alt={loggedInUser.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                    {loggedInUser.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-gray-800 truncate">{loggedInUser.name}</span>
                                <span className="text-xs text-gray-500 truncate">{loggedInUser.email}</span>
                            </div>
                        </div>
                    )}

                    <nav className="flex flex-col gap-1.5">


                        <Link
                            href="/dashboard/my-booking"
                            className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/dashboard/my-booking'
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Button className={'rounded-lg'} variant='none'>My Booking</Button>
                        </Link>

                        <Link
                            href="/dashboard/profile"
                            className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/dashboard/profile'
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Button className={'rounded-lg'} variant='none'>Profile</Button>
                        </Link>

                    </nav>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        onClick={() => authClient.signOut()}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}