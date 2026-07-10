import BookedCard from '@/components/BookedCard';
import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Link from 'next/link';

export const metadata = {
    title: " My Booking | DocAppointment ",
    description: "...",
    icons: {
        icon: '/doctor-icon.svg'
    },
}

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user?.id || session?.id;

    const token = await auth.api.getToken({
        headers: await headers()
    })
    // console.log(token)

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${userId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const bookings = await res.json()

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div>
                <p className='font-bold text-2xl text-center'>All Booking</p>
                <p className="text-gray-500 mt-1 mb-2 font-medium text-center">
                    Total Bookings: <span className="text-blue-600 font-bold">{bookings?.length || 0}</span>
                </p>
            </div>

            <div className="mt-6">
               
                {!bookings || bookings.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 mt-4">
                        <p className="text-xl font-semibold text-gray-600">
                            You have no doctor's appointment
                        </p>
                        <p className="text-sm mt-10 text-gray-400 ">
                           <Link href={'/doctors'}>
                               <Button className={'rounded-none  border-none' } >
                                Get appointment
                               </Button>
                           </Link>
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {bookings.map(booking => (
                            <BookedCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;