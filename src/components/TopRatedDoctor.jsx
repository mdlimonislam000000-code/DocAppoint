import Image from 'next/image';
import Link from 'next/link';
import { FaLocationArrow } from 'react-icons/fa';

const TopRatedDoctors = async () => {
    let topDoctors = [];

    try {
        const res = await fetch('http://localhost:5000/doctors', { next: { revalidate: 60 } }); 
        if (res.ok) {
            const allDoctors = await res.json();

            topDoctors = allDoctors
                .filter(doc => (doc.rating >= 4.5) || true) 
                .slice(0, 3); 
        }
    } catch (error) {
        console.error("Top rated doctors fetch error:", error);
    }


    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
            <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-blue-600 bg-blue-50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Meet Our Experts
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
                    Our Top Rated Doctors
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-2">
                    Book appointments with highly qualified and strictly verified medical specialists.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {topDoctors.map((doctor) => {
                    const doctorRating = doctor?.rating ;

                    return (
                        <div
                            key={doctor._id}
                            className="group bg-white border border-gray-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">

                            <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
                                <Image
                                    src={doctor?.image}
                                    alt={doctor?.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"/>

                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
                                    <span className="text-amber-500 text-sm">★</span>
                                    <span className="text-xs font-bold text-gray-800">{doctorRating}</span>
                                   
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow gap-3">
                                <div>
                                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                                        {doctor?.specialty}
                                    </span>

                                    <h3 className="font-extrabold text-xl text-gray-800 mt-3 group-hover:text-blue-600 transition-colors">
                                        {doctor?.name}
                                    </h3>

                                    <p className="text-sm flex items-center gap-2 text-gray-500 font-medium mt-1">
                                        <FaLocationArrow /> {doctor?.hospital || "Hospital Information N/A"}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-auto">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Consultation Fee</p>
                                        <p className="text-lg font-black text-green-600 mt-0.5">
                                            {doctor?.fee || "500"} <span className="text-xs font-bold text-gray-500">Tk</span>
                                        </p>
                                    </div>

                                    <Link
                                        href={`/allAppointments/${doctor._id}`}
                                        className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/10 transition-all"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-center mt-12">
                <Link
                    href="/allAppointments"
                    className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-bold px-6 py-3 rounded-xl transition-all group"
                >
                    View All Available Doctors
                    <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
            </div>
        </section>
    );
};

export default TopRatedDoctors;