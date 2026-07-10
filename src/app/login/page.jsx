'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';



const LoginPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })

        // console.log({data  , error})
        if (data) {
            redirect('/')
        }
        if (error) {
            alert('Something is went')
        }
    }

    const handleGoogleSingIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (

        <div className='max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]'>

            <div className='w-full max-w-md flex flex-col items-center'>
                <div>
                    <p className='text-2xl font-bold text-center mt-7'>
                        Login Your account
                    </p>
                </div>

                <Card className='border-2 mt-8 p-4 md:p-6 w-full flex flex-col items-center'>

                    <Form className="flex w-full md:w-96 flex-col gap-4" onSubmit={onSubmit} >

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
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
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>
                        <div className="flex gap-2">
                            <Button type="submit" className={'w-full rounded-none'}>
                                Login
                            </Button>
                        </div>
                    </Form>

                    <div className="w-full md:w-96 mt-4">
                        <div className='text-center mb-2'>
                            <Separator></Separator>
                            <p>or sing up with</p>
                            <Separator></Separator>
                        </div>
                        <div className='mb-3'>
                            <Button onClick={handleGoogleSingIn} variant='outline' className={'w-full'}> <FcGoogle />Sing in with Google </Button>
                        </div>

                        <Separator></Separator>

                        <div className='text-center '>
                            <p>Don't have a account ? <Link className='text-[#3277f5]' href={'/register'}>Register</Link></p>
                        </div>

                        <Separator></Separator>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;