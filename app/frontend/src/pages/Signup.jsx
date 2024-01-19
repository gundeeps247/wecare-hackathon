import { useState } from "react";
import signupImg from "../assets/images/signup.gif";

import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import { BASE_URL } from "../config";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading ] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
    totalRating:0,
    qualifications: "",
    timeSlots: [''],
  });
  const navigate = useNavigate()

  const handleTimeSlotChange = (e, index) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index] = e.target.value;
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  const addTimeSlot = () => {
    setFormData({ ...formData, timeSlots: [...formData.timeSlots, ""] });
  };

  const removeTimeSlot = (index) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots.splice(index, 1);
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'totalRating') {
      setFormData({ ...formData, totalRating: parseInt(e.target.value) });
    }
    // if (e.target.name === 'qualifications' || e.target.name === 'experiences') {
    //   const newArray = e.target.value.split('\n').map((item) => item.trim());
      // setFormData({ ...formData, [e.target.name]: newArray });
    // } 
    else if (e.target.name === 'timeSlots') {
      // Handle dynamic time slots separately
      handleTimeSlotChange(e);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url)
    setSelectedFile(data.url)
    setFormData({...formData, photo:data.url})
    
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
// console.log(formData)
    try {
      // console.log(formData)
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ==========img box=========== */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          {/* ==========sign-up form ================*/}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </div>
              {formData.role==="doctor" && (

                <div>
                  <textarea
                    placeholder="Qualifications (Enter each qualification on a new line)"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder-textColor cursor-pointer"
                    required
                  />
                  <div className="mb-5">
                    <label className="text-headingColor font-bold text-[16px] leading-7 mb-2">
                      Time Slots:
                    </label>
                    {formData.timeSlots.map((timeSlot, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          placeholder={`Time Slot ${index + 1}`}
                          value={timeSlot}
                          onChange={(e) => handleTimeSlotChange(e, index)}
                          className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder-textColor cursor-pointer"
                          required
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(index)}
                            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addTimeSlot} className="px-4 py-2 bg-green-500 text-white rounded">
                      Add Time Slot
                    </button>
                  </div>
                </div>
                

              )}
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                {selectedFile && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img src={previewURL} alt="" className="w-full h-full rounded-full" />
                </figure>}
              </div>

              <div className="relative w-[130px] h-[50px]">
                <input
                  type="file"
                  name="photo"
                  id="customFile"
                  onChange={handleFileInputChange}
                  accept=".jpg, .png"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile"
                  className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>

              <div className="mt-7">
                <button
                disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  { loading ? <HashLoader size={35} color="#ffffff"/> : 'Sign Up' }
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link to="/login" className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
