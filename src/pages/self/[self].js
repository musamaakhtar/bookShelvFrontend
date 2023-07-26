import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image"
import Navbar from "../navbar";
import { useRouter } from 'next/router';
import { getUser } from "../../../lib/api"
export default function Self() {
  const [user, setUser] = useState([""]);
  const router = useRouter();
  const { self } = router.query;
  console.log(user, "this one is our id");
  useEffect(() => {
    getUser(self).then((res) => {
      setUser(res)
    })
  }, [self])
  return (
    <>
      <Navbar />
      <div class="bg-white py-24 sm:py-32">
      <Image src={user?.profilePic ? user.profilePic : "/download.jpeg"} width={100} height={100} alt="profile pic"/>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <div className="flex w-[70vw]">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{user?.name}</h2>
              <h2 class="text-3xl ml-5 font-bold tracking-tight text-gray-900 sm:text-4xl">S/O</h2>
              <h2 class="text-3xl ml-5 font-bold tracking-tight text-gray-900 sm:text-4xl">{user?.Father}</h2>
            </div>
            <h1 class="mt-2 text-3xl leading-8 underline font-monospace font-semibold text-gray-600">Description.</h1>
            <p class="mt-2 text-lg leading-8 text-gray-600">{user?.describe}</p>
          </div>
          <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article class="flex max-w-xl flex-col items-start justify-between">
              <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                    Your Information
                  </a>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 h-[25vh]">
                  CNIC Number : <span className="">{user.CNIC}</span> <br />
                  Email Adress : <span className="">{user.email}</span><br />
                  Batch Code : <span className="">{user.Batch}</span><br />
                  Roll Number : <span className="">{user.Roll_Number}</span><br />
                  Attend Slot : <span className="">{user.Slot}</span><br />
                  Gender : <span className="">{user.gender}</span><br />
                </p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">
                    <a href="#">
                      <span class="absolute inset-0 "></span>
                      Created by :
                    </a>
                  </p>
                  <p class="text-gray-600 ml-[6vw]">Usama Rajpoot</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </div>
    </>
  );
}