import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidgets from '../components/BookingWidgets';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

const EachPlacePage = () => {
    const [place, setPlace] = useState(null);
    const { id } = useParams();


    useEffect(() => {


        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then(resp => {
            setPlace(resp.data);
        })

    }, [id]);

    if (!place) return '';



    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>

            <h1 className='text-2xl'>{place.title}</h1>

            <AddressLink address={place.address} />

            {/* images */}
            <PlaceGallery place={place} />

            {/*  */}
            <div className='grid mt-8 mb-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div className='m-1'>
                    {/* description */}
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>

                    <b>Check-in:  </b>{place.checkIn} <br />
                    <b>Check-out:  </b>{place.checkOut} <br />
                    <b>Max No. of guests: </b> {place.maxGuests}

                </div>

                <div>

                    <BookingWidgets place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className='font-semibold text-2xl mt-4 ml-1'>Extra info</h2>
                </div>
                <div className='my-4 mb-4 mt-2 ml-1 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>
            </div>

        </div>
    )
}

export default EachPlacePage
