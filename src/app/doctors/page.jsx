'use client'
import DoctorsCard from '@/components/DoctorsCard';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const AllAppointmentsPage = () => {
    const [allDoctors, setAllDoctors] = useState([]);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [sortOrder, setSortOrder] = useState('no-sorting');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors');
                const data = await res.json();
                setAllDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    let displayDoctors = allDoctors.filter(doctor => {
        const nameMatch = doctor.name ? doctor.name.toLowerCase().includes(searchDoctor.toLowerCase()) : false;
        const specialtyMatch = doctor.specialty ? doctor.specialty.toLowerCase().includes(searchDoctor.toLowerCase()) : false;
        return nameMatch || specialtyMatch;
    });

    if (sortOrder === 'high-rating') {
        displayDoctors = [...displayDoctors].sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === 'low-rating') {
        displayDoctors = [...displayDoctors].sort((a, b) => a.rating - b.rating);
    }

    return (
        <div className="max-w-6xl mx-auto px-4">

            <div className='text-center'>
                <p className='font-bold text-3xl mt-5 text-[#434141c1]'>All Doctors</p>

                <p className='mt-2 text-gray-500'>Find the best doctor for your condition.</p>
            </div>

            <div className='flex flex-col items-center justify-center gap-4 mt-5 mb-8'>

                <div className='flex  gap-10'>
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            value={searchDoctor}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                            placeholder="Search by doctor's name or specialty..."
                            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-400 shadow-sm text-gray-700 bg-gray-50"
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <FiSearch className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="relative w-full max-w-xs">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-700 shadow-sm cursor-pointer font-medium appearance-none"
                        >
                            <option value="no-sorting">No Sorting</option>
                            <option value="high-rating">High to Low</option>
                            <option value="low-rating">Low to High</option>
                        </select>

                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                            <FiChevronDown className="w-5 h-5" />
                        </div>
                    </div>
                </div>

            </div>

            {displayDoctors.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        displayDoctors.map(doctor => (
                            <DoctorsCard key={doctor._id} doctor={doctor} />
                        ))
                    }
                </div>
            ) : (
                <div className="text-center mt-10 text-gray-400 font-medium border-2 p-20 rounded-2xl">
                    No doctors found
                </div>
            )}
        </div>
    );
};

export default AllAppointmentsPage;