import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';

const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post("/getBookings", { token }).then(resp => {
            const found = resp.data.find(({ _id }) => _id === id);
            if (found) {
                setBooking(found);
            }
        })
    }, [id])

    if (!booking) return '';
    return (
        <div className='my-8'>
            <h1 className='font-semibold'>{booking.place.title}</h1>
            <AddressLink address={booking.place.address} />
            <div className='bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl mb-4'>Your Booking Information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className='bg-primary rounded-2xl p-4 text-white'>
                    <div>Total Price:</div>
                    <div className='text-3xl'> ${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default BookingPage
