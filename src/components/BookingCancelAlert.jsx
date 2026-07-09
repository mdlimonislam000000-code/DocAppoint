'use client'
import { AlertDialog, Button } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

const BookingCancelAlert = ({bookingId}) => {

    const handleDelete = async ()=>{
        const res = await fetch(`http://localhost:5000/booking/${bookingId}` , {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        window.location.reload()
        toast.error('Your appointment delete successfully')
    }
    return (
        <div>
            <AlertDialog>
                <Button
                    className="w-full font-medium text-sm bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2 border-none"
                    variant="light"
                    radius="md"
                >
                    <FaTrashAlt /> Cancel Booking
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                               
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={handleDelete} slot="close" variant="danger">
                                    Delete 
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default BookingCancelAlert;