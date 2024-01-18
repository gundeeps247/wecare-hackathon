import { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/doctors');

        setDoctors(response.data.data);
   // Assuming your API response is an array of doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap[30px] mt-[30px] lg:mt-[55px]'>
    <h1>hello </h1>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
      {console.log(doctors)}
    </div>
  );
};

export default DoctorsList;
