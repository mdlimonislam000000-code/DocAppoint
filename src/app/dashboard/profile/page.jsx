import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';

const ProfilePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    const userId = user?.id || session?.id;
    let bookings = [];


    try {
        const res = await fetch(`http://localhost:5000/booking/${userId}`);
        if (res.ok) {
            bookings = await res.json();
        }
    } catch (error) {
        console.error("Profile data fetch error:", error);
    }

    const totalSpent = bookings.reduce((sum, booking) => {
        const fee = parseFloat(booking?.doctorFee) || 0;
        return sum + fee;
    }, 0);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-1 bg-white border border-gray-200 p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500">
                        <Image
                            src={user?.image}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className="font-bold text-xl text-gray-800">{user?.name }</h2>
                    <p className="text-sm text-gray-500 break-all">{user?.email}</p>
                    <span className="mt-4 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase">
                        Patient
                    </span>
                </div>

                <div className="md:col-span-2 flex flex-col gap-6">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500 font-medium">Total Appointments</p>
                            <p className="text-3xl font-bold text-blue-600 mt-1">{bookings.length}</p>
                        </div>
                        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500 font-medium">Total Fees</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">{totalSpent} Tk</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col gap-4">
                        <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Account Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Full Name</label>
                                <p className="text-gray-700 font-medium mt-0.5">{user?.name || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Email Address</label>
                                <p className="break-all text-gray-700 font-medium mt-0.5">{user?.email || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Account ID</label>
                                <p className="text-gray-600 text-sm font-mono mt-0.5 break-all">{userId || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Joined Since</label>
                                <p className="text-gray-700 font-medium mt-0.5">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;