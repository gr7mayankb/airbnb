import React, { useEffect, useState } from 'react'
import Perks from '../components/Perks';
import PhotoUploader from '../../PhotoUploader';
import axios from 'axios';
import AccountNavigation from '../components/AccountNavigation';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
    const { id } = useParams();
    const [title, setTittle] = useState('')
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if (!id) return;
        axios.get("/places/" + id).then((resp) => {
            const { data } = resp;
            setTittle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    function inputHeader(text) {
        return (<h2 className='text-2xl mt-4'>{text}</h2>);
    };

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    };

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    };

    async function savePlace(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const placeData = {
            token,
            title, address, addedPhotos,
            description, perks, extraInfo, checkIn,
            checkOut, maxGuests, price
        }
        if (id) {
            //updating existing place
            await axios.put("/places", {
                id, ...placeData
            })
        }
        else {
            // add new place
            await axios.post("/places", placeData);
        }
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNavigation />
            <form onSubmit={savePlace}>
                {/* Title */}
                {preInput('Title', 'Title for your place')}
                <input type="text" placeholder='title'
                    value={title} onChange={e => setTittle(e.target.value)} />

                {/* Adress */}
                {preInput('Adress', 'Adress of the Place')}
                <input type="text" placeholder='address'
                    value={address} onChange={e => setAddress(e.target.value)} />

                {/* Upload Photos */}
                {preInput('Photos', 'more=better')}

                {/* add photo using link */}
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {/* description */}
                {preInput('Description', 'Description of the place')}
                <textarea className='border border-2'
                    value={description} onChange={e => setDescription(e.target.value)} />

                {/* Perks */}
                {preInput('Perks', 'Select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks} />

                {/*  Extra info */}
                {preInput('Extra Info', 'House rules,etc')}
                <textarea className='border border-2'
                    value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                {/* Check in out time and guests */}
                {preInput('Check in&out time', 'add check in and out time ')}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
                    <div>
                        <h3 className='mt-2 -mb-1 ml-1'>Check in time</h3>
                        <input type="text" placeholder='14:00'
                            value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1 ml-1'>Check out time</h3>
                        <input type="text" placeholder='12:00'
                            value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1 ml-1'>Max no. of guests</h3>
                        <input type="number"
                            value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1 ml-1'>Price per night</h3>
                        <input type="number"
                            value={price} onChange={e => setPrice(e.target.value)} />
                    </div>

                </div>

                {/* Save button */}
                <button className='my-4 primary'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage
