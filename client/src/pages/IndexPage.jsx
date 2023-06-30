import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const IndexPage = () => {
    const [places, setPlaces] = useState('');
    useEffect(() => {
        axios.get('/index-page').then(resp => {
            setPlaces([...resp.data, ...resp.data, ...resp.data]);
        })
    }, [])
    
    return (
        <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map(place => (
                <Link to={'/place/' + place._id}>
                    {/* Image */}
                    <div className='bg-gray-500 rounded-2xl flex mb-2'>
                        {place.photos?.[0] && (
                            <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:5000/' + place.photos[0]} alt="" />
                        )}
                    </div>

                    {/* title */}
                    <h2 className='font-bold'>{place.address}</h2>
                    <h3 className='text-sm text-gray-500  truncate'>{place.title}</h3>
                    <div className='mt-1'>
                        <span className='font-bold'> ${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default IndexPage
