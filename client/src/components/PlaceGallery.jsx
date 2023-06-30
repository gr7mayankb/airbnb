import React, { useState } from 'react'

const PlaceGallery = ({ place }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    if (showAllPhotos) {
        return (

            <div className='absolute inset-0 text-white  min-h-screen'>
                <div className='p-8 grid gap-4 bg-black'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
                        <button onClick={() => {
                            setShowAllPhotos(false);
                        }} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black   bg-white text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {
                        place?.photos?.length > 0 && place.photos.map(photo => (
                            <div>
                                <img className='rounded-2xl w-full' src={'http://localhost:5000/' + photo} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>

        )
    }
    return (
        <>
            {/* image */}
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {
                            place.photos?.[0] && (
                                <div >
                                    <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover ' src={'http://localhost:5000/' + place.photos[0]} alt="" />
                                </div>
                            )
                        }
                    </div>
                    <div className='grid'>
                        {
                            place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:5000/' + place.photos[1]} alt="" />
                            )
                        }
                        <div className='overflow-hidden'>

                            {
                                place.photos?.[2] && (
                                    <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2' src={'http://localhost:5000/' + place.photos[2]} alt="" />
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* show all photos */}
                <button onClick={() => setShowAllPhotos(true)} className='flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl border border-black shadow shadow-md shadow-gray-500'>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>

                    Show more photos
                </button>
            </div>


        </>
    )
}

export default PlaceGallery
