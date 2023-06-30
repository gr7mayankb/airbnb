import React, { useEffect, useState } from 'react'
import AccountNavigation from '../components/AccountNavigation'
import axios from 'axios'
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post("/getBookings", { token }).then(resp => {
            setBookings(resp.data);
        })
    }, [])
    return (
        <div>
            <AccountNavigation />
            <div>

                {bookings?.length > 0 && (
                    bookings.map(booking => (
                        <Link to={`/account/bookings/${booking._id}`} className='m-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                            <div className=' w-48 max-h-7 min-w-30'>
                                <img className='' src={'http://localhost:5000/' + booking.place.photos[0]} alt="" />
                            </div>

                            <div className='py-1 pr-3 grow'>
                                <h2 className='text-xl '>{booking.place.title}</h2>
                                <BookingDates booking={booking} />
                                <div className='font-semibold mb-2'>
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights 🌃 |
                                    Total Price: ${booking.price}
                                </div>
                            </div>

                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default BookingsPage
