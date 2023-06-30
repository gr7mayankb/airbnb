import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from "../UserContext";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);


    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/login", {
                email,
                password
            }, {
                withCredentials: true,
            });


            if (data.success) {
                setUser(data);
                setRedirect(true);
                localStorage.setItem('token', JSON.stringify(data.token));
               
            }


            alert(data.message);
        } catch (error) {
            alert("Login failed");
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-60">
                <h1 className='text-3xl text-center mb-4 font-semibold' >Login</h1>
                <form className='max-w-md mx-auto' onSubmit={loginUser}>

                    <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button className='primary'>Login</button>
                    <div className="text-center py-2 text-gray-400">
                        Dont't have an account yet? <Link to={"/register"} className='underline text-black'>Register now</Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
