'use client'
import { Avatar, Card } from '@heroui/react';
import React from 'react';
import { FaRegCalendarAlt, FaRegClock, FaPhoneAlt, FaHospital } from 'react-icons/fa';
import BookingEditCard from './BookingEditCard';
import BookingCancelAlert from './BookingCancelAlert';

const BookedCard = ({ booking }) => {
    const {_id, userImage, userName, doctorName, doctorFee, doctorImage, selectedDate, bookingTime, phone, message, doctorHospital } = booking;

    const formatDate = (dateString) => {
        if (!dateString) return "Not Selected";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="mb-4 md:mb-5">
            
            <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 items-center shadow-sm hover:shadow-md border border-gray-100 transition-all bg-white rounded-2xl">
                
                <div className="flex flex-col gap-2.5 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-0 md:pr-4">
                    <div className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider">
                        Patient Information
                    </div>
                    <div className="flex items-center gap-3">                 
                        <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-blue-100 shrink-0">
                            <Avatar.Image referrerPolicy="no-referrer" alt={userName} src={userImage} />
                            <Avatar.Fallback>{userName?.charAt(0).toUpperCase() || "P"}</Avatar.Fallback>
                        </Avatar>
                        <div className="min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm md:text-base truncate">{userName}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                <FaPhoneAlt className="text-gray-400 shrink-0" /> {phone}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded-xl flex justify-between text-[11px] md:text-xs text-gray-600 mt-1">
                        <span className="flex items-center gap-1"><FaRegCalendarAlt className="text-blue-500 shrink-0" /> {formatDate(selectedDate)}</span>
                        <span className="flex items-center gap-1"><FaRegClock className="text-blue-500 shrink-0" /> {bookingTime}</span>
                    </div>
                    
                    {message && (
                        <p className="text-[11px] md:text-xs text-gray-600 bg-amber-50 text-amber-800 px-2.5 py-1.5 rounded-lg border border-amber-100 mt-1 break-words">
                            <span className="font-bold">Reason:</span> {message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2.5 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-0 md:pr-4 justify-center">
                    <div className="text-[10px] md:text-xs font-bold text-green-600 uppercase tracking-wider">
                        Doctor Information
                    </div>
                    <div className="flex items-center gap-3">
                     
                        <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-green-100 shrink-0">
                            <Avatar.Image referrerPolicy="no-referrer" alt={doctorName} src={doctorImage} />
                            <Avatar.Fallback>{doctorName?.charAt(0).toUpperCase() || "D"}</Avatar.Fallback>
                        </Avatar>
                        <div className="min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm md:text-base truncate">{doctorName}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                <FaHospital className="text-gray-400 shrink-0" /> {doctorHospital}
                            </p>
                        </div>
                    </div>
                    <div className="mt-0.5">
                        <p className="text-xs md:text-sm font-semibold text-gray-700">
                            Fee: <span className="text-green-600 font-bold">৳{doctorFee}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full justify-center pl-0 md:pl-2 pt-2 md:pt-0">
                    <BookingEditCard bookingId={_id} booking={booking}></BookingEditCard>
                    <BookingCancelAlert bookingId={_id} ></BookingCancelAlert>
                </div>

            </Card>
        </div>
    );
};

export default BookedCard;