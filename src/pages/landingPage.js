import React, { useState, useEffect } from 'react';
import Head from "next/head"
import Navbar from './navbar';
import Image from 'next/image';
import { GoThreeBars } from 'react-icons/go'
import { getAllBooks, updateBookStatus } from "../../lib/api" 
import Link from 'next/link';
export default function LandingPage(props) {
    const [dataSearch, setDataSearch] = useState("")
    const [searchReading, setSearchReading] = useState("")
    const [searchComplete, setSearchComplete] = useState("")
    const [searchPlaneToRead, setSearchPlaneToRead] = useState("")
    const handleSearch = (data) => {
        setDataSearch(data)
    }
    const [isOpen, setIsOpen] = useState("");
    const [data, setData] = useState("")
    const [updateBooks, setUpdateBooks] = useState("")
    const reading = data.length ? data?.filter((data, i) => data.status === "reading") : "";
    const complete = data.length ? data?.filter((data, i) => data.status === "complete") : "";
    const planeToRead = data.length ? data?.filter((data, i) => data.status === "planeToRead") : "";
    useEffect(() => {


        const readingItem = reading.length ? reading?.filter(item  => 
            item?.title?.toLowerCase().includes(dataSearch.toLowerCase())) : "" ;
        setSearchReading(readingItem);

        const completeItem = complete.length  ?complete?.filter(item =>
            item?.title?.toLowerCase().includes(dataSearch.toLowerCase())
        ) : "" ;
        setSearchComplete(completeItem);

        const planeToReadItem = planeToRead ?  planeToRead?.filter(item =>
            item?.title?.toLowerCase().includes(dataSearch.toLowerCase())
        ) : "" ;
        setSearchPlaneToRead(planeToReadItem);
    }, [dataSearch]);

    const handleUpdate = (e, status) => {
        const value = {
            bookId: e,
            status: status
        }
        updateBookStatus(value).then((res) => {
            setUpdateBooks("updating")
        })
    }
    useEffect(() => {
        getAllBooks().then((res) => {
            setData(res.data)
        })
    }, [updateBooks])
    return (
        <>
            <Head>
                <title>Dashboard | Book_Shelevs</title>
            </Head>
            <div>
                <Navbar onDataChange={handleSearch} />
                {!dataSearch &&
                    <div className=' pb-[5vh]'>
                        <div className='h-auto'>
                            <h1 className='text-center mt-5'>Reading</h1>

                            <div className='flex  w-[70%] ml-[15%] flex-wrap gap-20 mt-2'>
                                {
                                    reading?.length ?
                                        reading?.map((data, i) => (
                                            <div className='border border-dark w-[25%]' key={i}>
                                                <div className='relative h-[50%] w-[100%]'>
                                                    <div className="absolute left-[-10%] text-white">
                                                        <button
                                                            className="px-4 py-2 rounded-md focus:outline-none"
                                                            onClick={() => { isOpen === `open${i}` ? setIsOpen("") : setIsOpen(`open${i}`) }}
                                                        >
                                                            <GoThreeBars size={32} />
                                                        </button>
                                                        {isOpen === `open${i}` && (
                                                            <div className="absolute top-full left-[50%] mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "complete")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Completed</Link>
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "planeToRead")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Plan To Read</Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='border border-yellow-800 h-[100%] w-[100%] overflow-hidden' >
                                                        <Image
                                                            src={data?.profilepic}
                                                            alt="Description of the image"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Title : {data?.title}</p>
                                                    <p className='mt-[-3vh]'>Author Name : {data?.authorName}</p>
                                                    <p className='mt-[-3vh]'>Publication House: {data?.pubHouse}</p>
                                                    <p className='mt-[-3vh]'>Publication Date:{data?.pubDate}</p>
                                                    <p className='mt-[-3vh]'>Genre: &nbsp; {data?.genre}</p>
                                                    <p className='mt-[-3vh]'>Publication Year: {data?.pubYear}</p>
                                                </div>
                                            </div>
                                        ))

                                        :
                                        <p>No Reading Book available!</p>
                                }


                            </div>
                        </div>
                        <div className='h-auto'>
                            <h1 className='text-center mt-5'>Completed</h1>

                            <div className='flex  w-[70%] ml-[15%] flex-wrap gap-20 mt-2'>
                                {
                                    complete?.length ?
                                        complete?.map((data, i) => (
                                            <div className='border border-dark w-[25%]' key={i}>
                                                <div className='relative h-[50%] w-[100%]'>
                                                    <div className="absolute left-[-10%] text-white">
                                                        <button
                                                            className="px-4 py-2 rounded-md focus:outline-none"
                                                            onClick={() => { isOpen === `openComplete${i}` ? setIsOpen("") : setIsOpen(`openComplete${i}`) }}

                                                        >
                                                            <GoThreeBars size={32} />
                                                        </button>
                                                        {isOpen === `openComplete${i}` && (
                                                            <div className="absolute top-full left-[50%] mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "planeToRead")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Plan To Read</Link>
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "reading")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reading</Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='border border-yellow-800 h-[100%] w-[100%] overflow-hidden' >
                                                        <Image
                                                            src={data?.profilepic}
                                                            alt="Description of the image"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Title : {data?.title}</p>
                                                    <p className='mt-[-3vh]'>Author Name : {data?.authorName}</p>
                                                    <p className='mt-[-3vh]'>Publication House: {data?.pubHouse}</p>
                                                    <p className='mt-[-3vh]'>Publication Date:{data?.pubDate}</p>
                                                    <p className='mt-[-3vh]'>Genre: &nbsp; {data?.genre}</p>
                                                    <p className='mt-[-3vh]'>Publication Year: {data?.pubYear}</p>
                                                </div>
                                            </div>
                                        ))

                                        :
                                        <p className='text-center'>No Completed Book available!</p>
                                }


                            </div>
                        </div>
                        <div className='h-auto'>
                            <h1 className='text-center mt-5'>Plane to read</h1>

                            <div className='flex  w-[70%] ml-[15%] flex-wrap gap-20 mt-2'>
                                {
                                    planeToRead?.length ?
                                        planeToRead?.map((data, i) => (
                                            <div className='border border-dark w-[25%]' key={i}>
                                                <div className='relative h-[50%] w-[100%]'>
                                                    <div className="absolute left-[-10%] text-white">
                                                        <button
                                                            className="px-4 py-2 rounded-md focus:outline-none"
                                                            onClick={() => { isOpen === `openPlane${i}` ? setIsOpen("") : setIsOpen(`openPlane${i}`) }}
                                                        >
                                                            <GoThreeBars size={32} />
                                                        </button>
                                                        {isOpen === `openPlane${i}` && (
                                                            <div className="absolute top-full left-[50%] mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "complete")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Completed</Link>
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "reading")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reading</Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='border border-yellow-800 h-[100%] w-[100%] overflow-hidden' >
                                                        <Image
                                                            src={data?.profilepic}
                                                            alt="Description of the image"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Title : {data?.title}</p>
                                                    <p className='mt-[-3vh]'>Author Name : {data?.authorName}</p>
                                                    <p className='mt-[-3vh]'>Publication House: {data?.pubHouse}</p>
                                                    <p className='mt-[-3vh]'>Publication Date:{data?.pubDate}</p>
                                                    <p className='mt-[-3vh]'>Genre: &nbsp; {data?.genre}</p>
                                                    <p className='mt-[-3vh]'>Publication Year: {data?.pubYear}</p>
                                                </div>
                                            </div>
                                        ))

                                        :
                                        <p>No Book available! , in plane to read</p>
                                }


                            </div>
                        </div>
                        <Link href="/addBook">
                            <button className="btn btn-dark ml-[85%] mt-[5vh]">Add Books</button>
                        </Link>
                    </div>
                }
                {dataSearch &&
                    <div className=' pb-[5vh]'>
                        <div className='h-auto'>
                            <h1 className='text-center mt-5'>Reading Books</h1>

                            <div className='flex  w-[70%] ml-[15%] flex-wrap gap-20 mt-2'>
                                {
                                    searchReading?.length ?
                                    searchReading?.map((data, i) => (
                                            <div className='border border-dark w-[25%]' key={i}>
                                                <div className='relative h-[50%] w-[100%]'>
                                                    <div className="absolute left-[-10%] text-white">
                                                        <button
                                                            className="px-4 py-2 rounded-md focus:outline-none"
                                                            onClick={() => { isOpen === `open${i}` ? setIsOpen("") : setIsOpen(`open${i}`) }}
                                                        >
                                                            <GoThreeBars size={32} />
                                                        </button>
                                                        {isOpen === `open${i}` && (
                                                            <div className="absolute top-full left-[50%] mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "complete")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Completed</Link>
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "planeToRead")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Plan To Read</Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='border border-yellow-800 h-[100%] w-[100%] overflow-hidden' >
                                                        <Image
                                                            src={data?.profilepic}
                                                            alt="Description of the image"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Title : {data?.title}</p>
                                                    <p className='mt-[-3vh]'>Author Name : {data?.authorName}</p>
                                                    <p className='mt-[-3vh]'>Publication House: {data?.pubHouse}</p>
                                                    <p className='mt-[-3vh]'>Publication Date:{data?.pubDate}</p>
                                                    <p className='mt-[-3vh]'>Genre: &nbsp; {data?.genre}</p>
                                                    <p className='mt-[-3vh]'>Publication Year: {data?.pubYear}</p>
                                                </div>
                                            </div>
                                        ))

                                        :
                                        <p>No Reading Book available!</p>
                                }


                            </div>
                        </div>

                        <div className='h-auto'>
                            <h1 className='text-center mt-5'>Completed</h1>

                            <div className='flex  w-[70%] ml-[15%] flex-wrap gap-20 mt-2'>
                                {
                                    searchComplete?.length ?
                                        searchComplete?.map((data, i) => (
                                            <div className='border border-dark w-[25%]' key={i}>
                                                <div className='relative h-[50%] w-[100%]'>
                                                    <div className="absolute left-[-10%] text-white">
                                                        <button
                                                            className="px-4 py-2 rounded-md focus:outline-none"
                                                            onClick={() => { isOpen === `openComplete${i}` ? setIsOpen("") : setIsOpen(`openComplete${i}`) }}

                                                        >
                                                            <GoThreeBars size={32} />
                                                        </button>
                                                        {isOpen === `openComplete${i}` && (
                                                            <div className="absolute top-full left-[50%] mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "planeToRead")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Plan To Read</Link>
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "reading")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reading</Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='border border-yellow-800 h-[100%] w-[100%] overflow-hidden' >
                                                        <Image
                                                            src={data?.profilepic}
                                                            alt="Description of the image"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Title : {data?.title}</p>
                                                    <p className='mt-[-3vh]'>Author Name : {data?.authorName}</p>
                                                    <p className='mt-[-3vh]'>Publication House: {data?.pubHouse}</p>
                                                    <p className='mt-[-3vh]'>Publication Date:{data?.pubDate}</p>
                                                    <p className='mt-[-3vh]'>Genre: &nbsp; {data?.genre}</p>
                                                    <p className='mt-[-3vh]'>Publication Year: {data?.pubYear}</p>
                                                </div>
                                            </div>
                                        ))

                                        :
                                        <p className='text-center'>No Completed Book available!</p>
                                }


                            </div>
                        </div>
                        <div className='h-auto'>
                            <h1 className='text-center mt-5'>Plane to read</h1>

                            <div className='flex  w-[70%] ml-[15%] flex-wrap gap-20 mt-2'>
                                {
                                    searchPlaneToRead?.length ?
                                    searchPlaneToRead?.map((data, i) => (
                                            <div className='border border-dark w-[25%]' key={i}>
                                                <div className='relative h-[50%] w-[100%]'>
                                                    <div className="absolute left-[-10%] text-white">
                                                        <button
                                                            className="px-4 py-2 rounded-md focus:outline-none"
                                                            onClick={() => { isOpen === `openPlane${i}` ? setIsOpen("") : setIsOpen(`openPlane${i}`) }}
                                                        >
                                                            <GoThreeBars size={32} />
                                                        </button>
                                                        {isOpen === `openPlane${i}` && (
                                                            <div className="absolute top-full left-[50%] mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "complete")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Completed</Link>
                                                                <Link href="#" onClick={() => handleUpdate(data._id, "reading")} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reading</Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='border border-yellow-800 h-[100%] w-[100%] overflow-hidden' >
                                                        <Image
                                                            src={data?.profilepic}
                                                            alt="Description of the image"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Title : {data?.title}</p>
                                                    <p className='mt-[-3vh]'>Author Name : {data?.authorName}</p>
                                                    <p className='mt-[-3vh]'>Publication House: {data?.pubHouse}</p>
                                                    <p className='mt-[-3vh]'>Publication Date:{data?.pubDate}</p>
                                                    <p className='mt-[-3vh]'>Genre: &nbsp; {data?.genre}</p>
                                                    <p className='mt-[-3vh]'>Publication Year: {data?.pubYear}</p>
                                                </div>
                                            </div>
                                        ))

                                        :
                                        <p>No Book available! , in plane to read</p>
                                }


                            </div>
                        </div>

                        <Link href="/addBook">
                            <button className="btn btn-dark ml-[85%] mt-[5vh]">Add Books</button>
                        </Link>
                    </div>
                }

            </div>
        </>
    );
}
