import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GoThreeBars } from 'react-icons/go'
import { useRouter } from 'next/router';
export default function Navbar(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [value , setValue] = useState("")

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = ()=>{
    localStorage.clear();
    router.push('/');
  }
  const handleSearch = ()=>{
    props.onDataChange(value)
  }
  return (
    <>
      <div className='border bg-gray-100 h-[60px] w-[100%] flex items-center pl-[10px]'>
        <Link href="/landingPage">
          <h1 className='text-xl font-semibold text-decoration   w-36 mr-[40px] cursor-pointer'>Book Shelves</h1>
        </Link>

        <h1 className='cursor-pointer font-semibold ml-[32%]'>Menu</h1>
        <input type="search" onChange={(e)=>{setValue(e.target.value)}} placeholder='Books By Title' className="ml-[20%]  pl-2 pr-[10px]" />
        <button className="btn text-white bg-black ml-2" onClick={handleSearch}>Search</button>
        <div className='relative h-[50%] w-[100%] ml-[2vw] mt-[-20px]'>
          <div className="absolute left-[0%]">
            <button
              className="px-4 py-2 rounded-md focus:outline-none"
              onClick={toggleDropdown}
            >
              <GoThreeBars size={32} />
            </button>
            {isOpen && (
              <div className="py-[3vh] absolute top-full left-[-100%] mt-2 w-28 bg-white rounded-md shadow-lg">
                <Link href="/landingPage">
                  <p className='cursor-pointer text-decoration-none ml-3 font-semibold'>Home</p>
                </Link>
                <h6 onClick={handleLogout} className=" ml-3 mt-[-2vh] text-gray-800 hover:bg-gray-200">Log Out</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
