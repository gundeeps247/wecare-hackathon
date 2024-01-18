import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import DoctorCard from './../../Components/Doctors/DoctorCard';
import Loading from '../../Components/Loader/Loading';
import Error from '../../Components/Error/Error';

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/appointments/my-appointments`);



  return (

    <div>
    {console.log(appointments)}
      {loading && !error && <Loading/>}

      {error && !loading && <Error errorMessage={error}/>} 

         {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {appointments.map(doctor => (
              <DoctorCard doctor={doctor} key={doctor._id} />
           ))}
              </div>
        )}
        {console.log("hello",error)}
      {!loading && appointments.length ===0 && 
          <h2 className='mt-5 text-center leading -7 texxt-[20px] font-semibold text-primaryColor'>you did not book any doctor yet!</h2>}
    </div>
  );
};

export default MyBookings;
