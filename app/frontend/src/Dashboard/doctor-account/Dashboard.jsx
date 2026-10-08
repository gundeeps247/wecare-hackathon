import { useContext, useState } from "react";

import { authContext } from "./../../context/AuthContext";

import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Loading from '../../Components/Loader/Loading';
import Error from '../../Components/Error/Error'
import Profile from "./DoctorProfile"
const Dashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const { data: userData,
    loading,
    error
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <section>
      {
        console.log(userData)}
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errorMessage={error} />}
        {
          !loading && !error && (<div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>

                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Qualifications:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.qualifications}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Experience:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.experiences && userData.experiences.map((experience, index) => (
                      <div key={index}>{experience}</div>
                    ))}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Appointments:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.appointment && userData.appointments.map((appointment, index) => (
                      <div key={index}>{appointment}</div>
                    ))}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Time Slots:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.timeSlots && userData.timeSlots.map((timeSlot, index) => (
                      <div key={index}>{timeSlot}</div>
                    ))}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("settings")}
                  className={`${tab === "settings" && "bg-primaryColor text-white font-normal"
                    }
              py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>)
        }
      </div>
    </section>
  );
};

export default Dashboard;
