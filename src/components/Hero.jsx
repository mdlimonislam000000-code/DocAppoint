'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors');
                if (res.ok) {
                    const data = await res.json();
                    setDoctors(data.slice(0, 10));
                }
            } catch (error) {
                console.error("Hero doctors fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

   
    useEffect(() => {
        if (doctors.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [doctors]);

    const activeDoctor = doctors[currentIndex];

    return (
        <section className="relative mt-5 w-full bg-gradient-to-br from-blue-50/60 via-white to-sky-50/40 overflow-hidden min-h-[600px] md:min-h-[650px] flex items-center">

            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-5%] w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
                
                <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-blue-700 text-xs font-bold uppercase tracking-wider">
                            Your Health, Our Priority
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight">
                        Find Trusted Doctors & <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                            Book Instantly
                        </span>
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg max-w-md leading-relaxed">
                        Connect with top-rated medical experts in your area. Safe, fast, and hassle-free booking platform for your family.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
                        <Link 
                            href="/doctors" 
                            className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200"
                        >
                            Book Appointment
                        </Link>
                        <Link 
                            href="/doctors" 
                            className="w-full sm:w-auto text-center bg-white hover:bg-gray-50 active:scale-95 text-gray-700 border-2 border-gray-200/80 font-semibold px-8 py-3.5 rounded-xl shadow-sm transition-all duration-200"
                        >
                            See All Specialists
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 mt-4 pt-6 border-t border-gray-100 w-full justify-center md:justify-start">
                        <div>
                            <p className="text-2xl font-extrabold text-gray-800">10+</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Verified Doctors</p>
                        </div>
                        <div className="h-8 w-px bg-gray-200" />
                        <div>
                            <p className="text-2xl font-extrabold text-gray-800">5k+</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Happy Patients</p>
                        </div>
                    </div>
                </div>

                <div className="relative w-full h-[350px] sm:h-[430px] lg:h-[480px] flex items-center justify-center">
                    
                    {loading ? (
                        <div className="w-full h-full bg-gray-200 animate-pulse rounded-3xl" />
                    ) : (
                        doctors.length > 0 && (
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                               
                                <Image 
                                    key={activeDoctor?._id} 
                                    src={activeDoctor?.image } 
                                    alt={activeDoctor?.name || "Doctor"}
                                    fill
                                    className="object-cover transition-all duration-700 ease-in-out animate-[fadeIn_0.5s_ease-in-out]"/>
                                
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 transform transition-transform duration-300 group-hover:scale-[1.02]">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                                                {activeDoctor?.specialty || "Specialist"}
                                            </span>
                                            <h3 className="font-extrabold text-gray-800 text-lg mt-1.5 transition-all">
                                                {activeDoctor?.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {activeDoctor?.hospital || "Available Now"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 font-medium">Fee</p>
                                            <p className="text-base font-black text-green-600">{activeDoctor?.fee || "0"} Tk</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 flex gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1.5 rounded-full">
                                    {doctors.map((_, idx) => (
                                        <div 
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>

            </div>
        </section>
    );
};

export default Hero;