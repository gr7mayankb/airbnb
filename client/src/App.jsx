import './App.css'
import { Route, Router, Routes } from "react-router-dom";
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import EachPlacePage from './pages/EachPlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = "http://127.0.0.1:5000"

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>

      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/account/places' element={<PlacesPage />} />
            <Route path='/account/places/new' element={<PlacesFormPage />} />
            <Route path='/account/places/:id' element={<PlacesFormPage />} />
            <Route  path='/place/:id' element={<EachPlacePage />} />
            <Route path='/account/bookings' element={<BookingsPage />} />
            <Route path='/account/bookings/:id' element={<BookingPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
      {/* <ToastContainer /> */}

    </>
  )
}

export default App
