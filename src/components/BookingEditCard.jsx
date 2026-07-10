'use client'
import { authClient } from '@/lib/auth-client';
import { Button, DateField, Input, Label, Modal, Surface, TimeField } from '@heroui/react';
import React, { useState, useEffect, useRef } from 'react'; 
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast'; 
import { parseDate, parseTime } from '@internationalized/date'; 
import { useRouter } from 'next/navigation'; 

const BookingEditCard = ({ booking }) => {
    const router = useRouter();
    
    const { 
        _id, 
        userName, 
        phone: initialPhone, 
        gender: initialGender, 
        selectedDate: initialDate, 
        bookingTime: initialTime, 
        message: initialMessage 
    } = booking || {};

    const { data } = authClient.useSession();
    const loggedInUser = data?.user;

    const formRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        if (initialDate) {
            try {
                const dateOnly = initialDate.split('T')[0]; 
                setSelectedDate(parseDate(dateOnly));
            } catch (e) {
                console.error("Date parsing error:", e);
            }
        }
        if (initialTime) {
            try {
                setSelectedTime(parseTime(initialTime));
            } catch (e) {
                console.error("Time parsing error:", e);
            }
        }
    }, [initialDate, initialTime]);

    const handleSubmit = async () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        
        const updatedPhone = formData.get('phone');
        const updatedGender = formData.get('gender');
        const updatedMessage = formData.get('message');
        const updatedPatientName = formData.get('name');
        const formattedDate = selectedDate ? selectedDate.toString() : null;
        const formattedTime = selectedTime ? selectedTime.toString() : null;

        const bookingData = {
            userId: loggedInUser?.id,
            userImage: loggedInUser?.image,
            userName: updatedPatientName || userName || loggedInUser?.name,
            userEmail: loggedInUser?.email,
            doctorId: booking?.doctorId,
            doctorName: booking?.doctorName,
            doctorExperience: booking?.doctorExperience,
            doctorSpecialty: booking?.doctorSpecialty,
            doctorAvailability: booking?.doctorAvailability,
            doctorHospital: booking?.doctorHospital,
            doctorFee: booking?.doctorFee,
            doctorImage: booking?.doctorImage,
            selectedDate: formattedDate,
            bookingTime: formattedTime,
            phone: updatedPhone,
            gender: updatedGender,
            message: updatedMessage
        };

        // console.log( bookingData);

        try {

            const {data : tokenData} = await authClient.token()

            const res = await fetch(`http://localhost:5000/booking/${_id}`, {
                method: "PATCH", 
                headers: {
                    'content-type': 'application/json',
                    authorization : `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(bookingData)
            });
            
            if (res.ok) {
                toast.success('Booking updated successfully!');
                router.refresh(); 
            } else {
                toast.error('Failed to update booking.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className='w-full'>
            <Modal>
                <Modal.Trigger className='w-full'>
                    <Button
                        className="w-full rounded-none font-medium text-sm text-gray-700 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2"
                        variant="bordered"
                        radius="md"
                    >
                        <FaEdit className="text-gray-500" /> Edit Info
                    </Button>
                </Modal.Trigger>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Edit Appointment Info</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Edit your contact info
                                </p>
                            </Modal.Header>
                            
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form ref={formRef} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                        
                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                defaultValue={userName || loggedInUser?.name || ""}
                                                placeholder="Enter your name"
                                                variant="bordered"
                                                radius="sm"
                                            />
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Email</Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                defaultValue={booking?.userEmail || loggedInUser?.email || ""}
                                                readOnly
                                                variant="bordered"
                                                radius="sm"
                                                className="bg-gray-50 opacity-80 cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                                            <Input 
                                                name="phone" 
                                                type="tel" 
                                                defaultValue={initialPhone || ""} 
                                                placeholder="Enter your phone number" 
                                                variant="bordered" 
                                                radius="sm" 
                                                required 
                                            />
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                                            <select
                                                name="gender"
                                                className="w-full h-10 px-3 py-2 bg-transparent text-sm border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-md outline-none transition-colors text-gray-700"
                                                defaultValue={initialGender || ""}
                                                required
                                            >
                                                <option value="" disabled>Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Appointment Date</Label>
                                            <DateField value={selectedDate} onChange={setSelectedDate} className="w-full">
                                                <Label className="hidden">Date</Label>
                                                <DateField.Group className="border-2 border-gray-200 p-2 rounded-md hover:border-gray-300 focus-within:border-blue-500 transition-colors">
                                                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                                </DateField.Group>
                                            </DateField>
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Preferred Time</Label>
                                            <TimeField value={selectedTime} onChange={setSelectedTime} className="w-full">
                                                <Label className="hidden">Time</Label>
                                                <TimeField.Group className="border-2 border-gray-200 p-2 rounded-md hover:border-gray-300 focus-within:border-blue-500 transition-colors">
                                                    <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
                                                </TimeField.Group>
                                            </TimeField>
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Problem (Optional)</Label>
                                            <Input 
                                                name="message" 
                                                defaultValue={initialMessage || ""} 
                                                placeholder="Enter any specific note" 
                                                variant="bordered" 
                                                radius="sm" 
                                            />
                                        </div>
                                    </form>
                                </Surface>
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>
                                <Button slot="close" onClick={handleSubmit}>Update Booking</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default BookingEditCard;