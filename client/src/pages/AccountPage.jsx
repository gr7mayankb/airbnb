import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountNavigation from '../components/AccountNavigation';

const AccountPage = () => {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
   

    if (subpage === undefined) {
        subpage = 'profile';
    }

    function logout() {
        localStorage.setItem("token", null);
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return "Loading...";
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNavigation />
            
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'> Logout</button>
                </div>
            )}

            {
                subpage === 'places' && (
                    <PlacesPage />
                )
            }
        </div>
    )
}

export default AccountPage
