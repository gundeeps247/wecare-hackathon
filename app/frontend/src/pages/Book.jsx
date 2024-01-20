/* eslint-disable no-unused-vars */
import { BASE_URL, token } from "../config";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import qrcode from 'qrcode'
import { authContext } from '../context/AuthContext'
import useGetProfile from '../hooks/useFetchData';
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
// import Loading from '../../Components/Loader/Loading';
// import Error from '../../Components/Error/Error'
// import Profile from "./DoctorProfile"


// ... (previous imports)

const Book = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const [doctors, setDoctors] = useState([]);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);
  const [formData, setFormData] = useState({
    doctor: null,
    user: userData._id,
    ticketPrice: 2000,
    appointmentDate: null,
    status: 'pending',
    isPaid: false,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/doctors');
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);


  const handleEmailChange = (event) => {
    // Update formData for email field
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: event.target.value,
    }));
  };

  const handlePriceChange = (event) => {
    // Update formData for price field
    setFormData((prevFormData) => ({
      ...prevFormData,
      ticketPrice: event.target.value,
    }));
  };

  const handleDateChange = (event) => {
    // Update formData for date field
    setFormData((prevFormData) => ({
      ...prevFormData,
      appointmentDate: event.target.value,
    }));
  };

  const handlePaidChange = (event) => {
    // Update formData for paid field
    setFormData((prevFormData) => ({
      ...prevFormData,
      isPaid: true,
      status: 'approved'
    }));
  };

  const handleDoctorAndUserChange = (event) => {
    // Update formData for doctor field
    setFormData((prevFormData) => ({
      ...prevFormData,
      doctor: event.target.value,
      user:userData._id
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formData)    // Your existing code for form submission
    try {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      setFormData({
        doctor: null,
        user: userData._id,
        ticketPrice: 2000,
        appointmentDate: null,
        status: 'pending',
        isPaid: false,
      });
      // Handle success, redirect, etc.
    } catch (err) {
      toast.error(err.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <section>
      {/* Your existing JSX */}
      <form className="px-4 mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <div>
          <label htmlFor="email" className="form_label">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            placeholder="example@gmail.com"
            className="form_input mt-1"
            disabled
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="price" className="form_label">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={formData.ticketPrice}
            className="form_input mt-1"
            disabled
            onChange={handlePriceChange}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="date" className="form_label">
            Date 
          </label>
          <input
            type="date"
            id="date"
            className="form_input mt-1"
            onChange={handleDateChange}
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Paid:
            <select
              name="paid"
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              onChange={handlePaidChange}
            >
                              <option value={false}>Not</option>
                <option value={true}>Paid</option>


            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Select a doctor:
            <select
              name="Doctor"
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              onChange={handleDoctorAndUserChange}
            >
              {doctors && doctors.map((doctor, index) => (
                <option key={index} value={doctor._id}>{doctor.name}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn rounded sm:w-fit">Submit</button>
      </form>
    </section>
  );
};

export default Book;
