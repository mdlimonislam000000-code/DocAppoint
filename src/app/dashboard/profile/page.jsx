import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';

export const metadata = {
    title: " My profile | DocAppointment ",
    description: "...",
    icons: {
        icon: '/doctor-icon.svg'
    },
}

const ProfilePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    const userId = user?.id || session?.id;
    let bookings = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${userId}`);
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
        /* 🎯 মোবাইলের জন্য প্যাডিং p-4 এবং ডেস্কটপে p-6 করা হয়েছে যেন স্ক্রিন ভেঙে না যায় */
        <div className="max-w-3xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">My Profile</h1>

            {/* 🎯 গ্রিড কলাম লেআউট মোবাইলে ১ কলাম এবং md স্ক্রিনে ৩ কলামে ভাগ হবে */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                {/* প্রোফাইল কার্ড পার্ট */}
                <div className="md:col-span-1 bg-white border border-gray-200 p-5 md:p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500 shrink-0">
                        <Image
                            src={user?.image || "/fallback-avatar.png"} // ইমেজ মিসিং থাকলে ক্রাশ এড়াতে ব্যাকআপ দেওয়া ভালো
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className="font-bold text-lg md:text-xl text-gray-800 truncate w-full px-2">{user?.name}</h2>
                    <p className="text-xs md:text-sm text-gray-500 break-all w-full px-2 mt-0.5">{user?.email}</p>
                    <span className="mt-4 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase">
                        Patient
                    </span>
                </div>

                {/* ইনফরমেশন এবং স্ট্যাটাস পার্ট */}
                <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">

                    {/* 🎯 টোটাল কাউন্ট কার্ড দুটি ছোট মোবাইলেও যেন ভেঙে নিচে না নেমে পাশাপাশি সুন্দরভাবে থাকে */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-xl shadow-sm">
                            <p className="text-xs md:text-sm text-gray-500 font-medium">Total Appointments</p>
                            <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">{bookings.length}</p>
                        </div>
                        <div className="bg-white border border-gray-200 p-4 md:p-5 rounded-xl shadow-sm">
                            <p className="text-xs md:text-sm text-gray-500 font-medium">Total Fees</p>
                            <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1 truncate">{totalSpent} Tk</p>
                        </div>
                    </div>

                    {/* অ্যাকাউন্ট ডিটেইলস সেকশন */}
                    <div className="bg-white border border-gray-200 p-5 md:p-6 rounded-xl shadow-sm flex flex-col gap-4">
                        <h3 className="font-semibold text-base md:text-lg text-gray-800 border-b pb-2">Account Information</h3>

                        {/* 🎯 গ্রিড কলাম মোবাইলে ১টি করে কলামে নিচে নিচে এবং sm (ট্যাবলেট/মোবাইল) স্ক্রিন থেকে ২টি কলামে সাজানো থাকবে */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="min-w-0">
                                <label className="text-[10px] md:text-xs text-gray-400 block uppercase tracking-wider font-semibold">Full Name</label>
                                <p className="text-gray-700 text-sm md:text-base font-medium mt-0.5 truncate">{user?.name || "N/A"}</p>
                            </div>
                            <div className="min-w-0">
                                <label className="text-[10px] md:text-xs text-gray-400 block uppercase tracking-wider font-semibold">Email Address</label>
                                <p className="break-all text-gray-700 text-sm md:text-base font-medium mt-0.5">{user?.email || "N/A"}</p>
                            </div>
                            <div className="min-w-0">
                                <label className="text-[10px] md:text-xs text-gray-400 block uppercase tracking-wider font-semibold">Account ID</label>
                                <p className="text-gray-600 text-xs md:text-sm font-mono mt-0.5 break-all">{userId || "N/A"}</p>
                            </div>
                            <div className="min-w-0">
                                <label className="text-[10px] md:text-xs text-gray-400 block uppercase tracking-wider font-semibold">Joined Since</label>
                                <p className="text-gray-700 text-sm md:text-base font-medium mt-0.5">
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