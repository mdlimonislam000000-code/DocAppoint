import BookedCard from '@/components/BookedCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user?.id || session?.id;

    const token = await auth.api.getToken({
        headers: await headers()
    })
    // console.log(token)

    const res = await fetch(`http://localhost:5000/booking/${userId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const bookings = await res.json()

    return (
        <div>
            <div>
                <p className='font-bold text-2xl text-center'>All Booking</p>
                <p className="text-gray-500 mt-1 mb-2 font-medium">
                    Total Bookings: <span className="text-blue-600 font-bold">{bookings.length}</span>
                </p>
            </div>

            <div>
                {
                    bookings.map(booking => <BookedCard key={booking._id} booking={booking}></BookedCard>)
                }
            </div>
        </div>
    );
};

export default MyBookingPage;