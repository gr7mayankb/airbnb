import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/register", {
                name,
                email,
                password,
            });
            console.log(data)
            toast.success("Registered Succefully");
        } catch (error) {
            alert("Email Already Exists")
        }

    }

    return (
        <>
            <div className='mt-4 grow flex items-center justify-around'>
                <div className="mb-60">
                    <h1 className='text-3xl text-center mb-4 font-semibold' >Register </h1>

                    <form className='max-w-md mx-auto' onSubmit={registerUser}>

                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' />

                        <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input type="password" placeholder='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)} />

                        <button className='primary'>Register</button>
                        <div className="text-center py-2 text-gray-400">
                            Already have an account  <Link to={"/login"} className='underline text-black'>Login </Link>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default RegisterPage
