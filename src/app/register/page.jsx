'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';



const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (data) {
            toast.success('Register successful');
            router.push('/');
        }
        if (error) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleGoogleSingIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        });
    };

    return (
        <div className='min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <p className='text-2xl md:text-3xl font-bold text-center mt-4 text-gray-800'>
                    Create an account
                </p>

                <Card className='border border-gray-100 mt-6 p-6 md:p-8 shadow-sm rounded-2xl bg-white'>
                    <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>

                        <TextField
                            isRequired
                            name="name"
                            type="text"
                            className="w-full"
                        >
                            <Label className="text-sm font-semibold text-gray-700">Name</Label>
                            <Input placeholder="Enter your name" className="mt-1" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField
                            isRequired
                            name="image"
                            type="url"
                            className="w-full"
                        >
                            <Label className="text-sm font-semibold text-gray-700">Image url</Label>
                            <Input placeholder="Enter your Image url" className="mt-1" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="w-full"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-gray-700">Email</Label>
                            <Input placeholder="john@example.com" className="mt-1" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type={showPassword ? "text" : "password"} 
                            className="w-full"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-gray-700">Password</Label>
                            <div className="relative w-full mt-1">
                                <Input placeholder="Enter your password" className="w-full pr-10" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xl"
                                >
                                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                </button>
                            </div>
                            <Description className="text-[11px] text-gray-400 mt-1">
                                Must be at least 8 characters with 1 uppercase and 1 number
                            </Description>
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <div className="flex gap-2 mt-2">
                            <Button type="submit" className='w-full bg-blue-600 text-white font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-colors'>
                                Register
                            </Button>
                        </div>

                        <div className='mt-1'>
                            <Button
                                type="button"
                                onClick={handleGoogleSingIn}
                                className='w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl transition-colors'
                            >
                                <FcGoogle className="text-xl" /> Sign in with Google
                            </Button>
                        </div>

                        <Separator className="my-2" />

                        <div className='text-center text-sm text-gray-600'>
                            <p>You have an account? <Link className='text-blue-600 font-semibold hover:underline' href={'/login'}>Login</Link></p>
                        </div>

                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;