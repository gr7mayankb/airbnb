import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const BookingWidgets = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])
    let numberOfNight = 0;
    if (checkIn && checkOut) {
        numberOfNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        const token = localStorage.getItem("token");

        const resp = await axios.post('/bookings', {
            token,
            checkIn, checkOut,
            numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNight * place.price
        });
        const bookingId = resp.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <div className='bg-white shadow p-4 rounded-2xl'>
                <div className='text-2xl text-center mb-1'>
                    
                    Price : ${place.price} / night
                </div>

                <div className='border rounded-2xl mt-4'>
                    <div className="flex">
                        <div className='px-4 py-3 '>
                            <label>Check in: </label>
                            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div className='px-4 py-2 border-l'>
                            <label>Check out:</label>
                            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                        </div>
                    </div>
                    <div className='px-4 py-2 border-t'>
                        <label>Number of guests: </label>
                        <input type="number" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                    </div>
                    {numberOfNight > 0 && (
                        <div className='px-4 py-2 border-t'>
                            <label>Your full Name: </label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />

                            <label>Your phone Number: </label>
                            <input type="tel" value={phone} onChange={e => setphone(e.target.value)} />
                        </div>
                    )}
                </div>
                <button onClick={bookThisPlace} className='primary mt-3'>
                    Book this place: &nbsp;
                    {numberOfNight > 0 && (
                        <>
                            <span>${numberOfNight * place.price}</span>
                        </>
                    )}
                </button>

            </div>
        </>
    )
}

export default BookingWidgets
