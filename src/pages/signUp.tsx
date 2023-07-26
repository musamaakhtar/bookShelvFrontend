import React from 'react';
import Head from "next/head"
import Swal from "sweetalert2";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form"
import { registerUser } from './../../lib/api';
export default function AllData() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (values: any) => {
        console.log(values, "thisone")
        await registerUser(values).then((res) => {
            if (res.data.message === "user registered") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Book Added",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
                router.push('/');
            } else (
                Swal.fire({
                    position: "center",
                    icon: "error",
                    text: "User Already Registered",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                })
            )
    })
}
return (
    <>
        <Head>
            <title>Sign Up | Book_Shelevs</title>
        </Head>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div className="mt-2">
                            <input id="firstName"  {...register("fullName")} type="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                        <input id="email" {...register("phoneNumber")} name="phoneNumber" type="number" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" {...register("email")} name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" {...register("password")} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?
                        <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 text-decoration-none">Signin</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
);
}
