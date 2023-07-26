import React, { useState } from 'react';
import Head from "next/head"
import Navbar from "./navbar"
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form"
import { addNewBook } from "../../lib/api"

export default function AddBook() {
   
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (values: any) => {
        if (values.profilepic && values.profilepic[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(values.profilepic[0]);
            reader.onloadend = () => {
                const base64String = reader.result?.toString();

                values.profilepic = base64String
                addNewBook(values).then((res) => {
                    console.log(res, values, "thisone")
                    console.log(res, "this one is too much")
                    if (res.data.message === "book added") {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "User Registered",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        router.push('/landingPage');
                    } else (
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            text: "Book not Added",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        })
                    )
                })
            }
        }
    }
    return (
        <>
            <Head>
                <title>Register Book | Book_Shelevs</title>
            </Head>
            <Navbar/>
            <form className="grid grid-rows-9 grid-cols-2 mt-[30px] gap-3 w-[80%] ml-[10%]" onSubmit={handleSubmit(onSubmit)} >
                <p>Title</p>
                <p>Author Name</p>
                <input  {...register("title")} className="border rounded" type="text" />
                <input  {...register("authorName")} className="border rounded" type="text" />
                <p>Publication House</p>
                <p>Publication Date</p>
                <input  {...register("pubHouse")} className="border rounded" type="text" />
                <input  {...register("pubDate")} className="border " type="date" />
                <p>Genre</p>
                <p>Publication Year</p>
                <input  {...register("genre")} className="border rounded" type="text" />
                <input  {...register("pubYear")} className="border rounded" type="number" />
                <p className="col-start-1 col-end-3">Book Picture</p>
                <input type="file" {...register('profilepic')} accept="image/*" />
                <input type="submit" className="border ml-[86.5%] w-[150px] h-[40px] bg-blue-600 text-white rounded col-start-1 col-end-3" value="submit" />
            </form>
            
        </>
    );
}
