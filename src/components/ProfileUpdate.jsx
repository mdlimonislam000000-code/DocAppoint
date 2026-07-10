'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Input, Label, Modal, Surface } from '@heroui/react';
import React, { useRef, useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ProfileUpdate = () => {
    const router = useRouter();
    const formRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const { data, isPending } = authClient.useSession();
    const loggedInUser = data?.user;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isPending) {
        return (
            <Button disabled className="opacity-50 font-medium text-sm flex items-center justify-center gap-2">
                Loading...
            </Button>
        );
    }

    if (!loggedInUser) return null;

    const handleSubmit = async () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);

        const updatedName = formData.get('name');
        const updatedProfileImage = formData.get('profileImage');

        if (!updatedName?.trim()) {
            toast.error("Name cannot be empty!");
            return;
        }

        const updatedData = {
            name: updatedName,
            image: updatedProfileImage
        };

        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update/${loggedInUser.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (res.ok) {
                await authClient.updateUser({
                    name: updatedName,
                    image: updatedProfileImage,
                });

                toast.success('Profile updated successfully!');
                router.refresh();
            } else {
                toast.error('Failed to update profile on server.');
            }

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className="inline-block">
            <Modal>
                <Modal.Trigger>
                    <Button 
                        color="primary" 
                        radius="md"
                        className="font-medium text-sm flex items-center justify-center gap-2"
                    > 
                        <FaEdit /> Update Profile
                    </Button>
                </Modal.Trigger>
                
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md text-left">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Edit Profile Info</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Update your name and profile picture URL
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
                                                defaultValue={loggedInUser?.name || ""}
                                                placeholder="Enter your name"
                                                variant="bordered"
                                                radius="sm"
                                                required
                                            />
                                        </div>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-sm font-semibold text-gray-700">Profile Photo URL</Label>
                                            <Input
                                                name="profileImage"
                                                type="url"
                                                defaultValue={loggedInUser?.image || ""}
                                                placeholder="Enter photo URL"
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
                                <Button slot="close" onClick={handleSubmit}>Save Changes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default ProfileUpdate;