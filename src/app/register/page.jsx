'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';

const RegisterPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password : user.password,
            name: user.name,
            image: user.image,
        })
        if(data){
            redirect('/')
        }
        if(error){
            alert('Something is went')
        }
    }

    return (
        <div className='max-w-7xl mx-auto '>
            <div>
                <p className='text-2xl font-bold text-center mt-7'>
                    Create a account
                </p>
            </div>
            <Card className='border-2 mt-8'>
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit} >
                    <TextField
                        isRequired
                        name="name"
                        type="name">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="image"
                        type="url">
                        <Label>Image url</Label>
                        <Input placeholder="Enter your Image url" />
                        <FieldError />
                    </TextField>
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
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;