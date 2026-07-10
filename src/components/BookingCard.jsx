'use client'
import { authClient } from '@/lib/auth-client';
import { Button, DateField, Input, Label, Modal, TimeField } from '@heroui/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope } from 'react-icons/fa';

const BookingCard = ({ doctors }) => {
    const { name, _id, fee, image , hospital, availability, experience, specialty} = doctors;

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const { data } = authClient.useSession();
    const loggedInUser = data?.user;

    const handleSubmit = async () => {
        const form = document.getElementById('booking-form');
        const formData = new FormData(form);
        const phone = formData.get('phone');
        const gender = formData.get('gender');
        const message = formData.get('message');
        const patientName = formData.get('name'); 
        const formattedDate = selectedDate ? new Date(selectedDate.toString()) : null;
        const formattedTime = selectedTime ? selectedTime.toString() : null;

        const bookingData = {
            userId: loggedInUser?.id,
            userImage: loggedInUser?.image,
            userName: patientName || loggedInUser?.name,
            userEmail: loggedInUser?.email,
            doctorId: _id,
            doctorName: name,
            doctorExperience: experience,
            doctorSpecialty: specialty,
            doctorAvailability: availability,
            doctorHospital: hospital,
            doctorFee: fee,
            doctorImage: image,
            selectedDate: new Date(formattedDate),
            bookingTime: formattedTime,
            phone: phone,          
            gender: gender,        
            message: message       
        }

        const {data: tokenData} = await authClient.token()

        if (!tokenData) {
        redirect('/login');
    }
        // console.log(tokenData)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(bookingData)
        })
        const result = await res.json();
        toast.success('You booked successfully!')
    }

    return (
        <Modal>
            <Button className='w-full bg-blue-600 text-white font-bold py-6 text-sm rounded-xl shadow-md hover:bg-blue-700 transition-colors' size="lg">
                Book Appointment
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground flex items-center justify-center p-2 rounded-lg">
                                <FaEnvelope className="size-5 text-blue-600" />
                            </Modal.Icon>
                            <Modal.Heading className="text-xl font-bold mt-2">Book an Appointment</Modal.Heading>
                            <div className="mt-1.5 flex gap-2 items-center text-sm leading-5 text-gray-500">
                                With , <span className='font-bold text-gray-700'>{name}</span>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                          
                            <form id="booking-form" className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="w-full flex flex-col gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Name</Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        defaultValue={loggedInUser?.name || ""}
                                        placeholder="Enter your name"
                                        variant="bordered"
                                        radius="sm"
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Email</Label>
                                    <Input
                                        key={loggedInUser?.email || "guest"}
                                        name="email"
                                        type="email"
                                        defaultValue={loggedInUser?.email || ""}
                                        readOnly={!!loggedInUser?.email}
                                        placeholder="Enter your email"
                                        variant="bordered"
                                        radius="sm"
                                        className={loggedInUser?.email ? "bg-gray-50 opacity-80 cursor-not-allowed" : ""}
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                                    <Input name="phone" type="tel" placeholder="Enter your phone number" variant="bordered" radius="sm" required />
                                </div>

                                <div className="w-full flex flex-col gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                                    <select
                                        name="gender"
                                        className="w-full h-10 px-3 py-2 bg-transparent text-sm border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-md outline-none transition-colors text-gray-700"
                                        defaultValue=""
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
                                    <DateField value={selectedDate} onChange={setSelectedDate} className="w-full" name="date">
                                        <Label className="hidden">Date</Label>
                                        <DateField.Group className="border-2 border-gray-200 p-2 rounded-md hover:border-gray-300 focus-within:border-blue-500 transition-colors">
                                            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                        </DateField.Group>
                                    </DateField>
                                </div>

                                <div className="w-full flex flex-col gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Preferred Time</Label>
                                    <TimeField value={selectedTime} onChange={setSelectedTime} className="w-full" name="time">
                                        <Label className="hidden">Time</Label>
                                        <TimeField.Group className="border-2 border-gray-200 p-2 rounded-md hover:border-gray-300 focus-within:border-blue-500 transition-colors">
                                            <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
                                        </TimeField.Group>
                                    </TimeField>
                                </div>

                                <div className="w-full flex flex-col gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Problem (Optional)</Label>
                                    <Input name="message" placeholder="Say What is your problem" variant="bordered" radius="sm" />
                                </div>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary" className="rounded-xl">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} slot="close" className="bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">
                                Submit Form
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default BookingCard;