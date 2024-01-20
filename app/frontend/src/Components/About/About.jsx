import React from 'react'
import aboutImg from "../../assets/images/about.png"
import aboutCardImg from "../../assets/images/about-card.png"
import { Link } from "react-router-dom"

const About = () => {
    return (
        <section>
            <div className='container'>
                <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                    {/* ====== about img ======== */}
                    <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                        <img src={aboutImg} alt="" />
                        <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[30%] and md:right-[-7%]
                        lg:right-[22%]'>
                            <img src={aboutCardImg} alt="" />
                        </div>
                    </div>
                    {/* ======= about content ======== */}
                    <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                        <h2 className='heading'>Proud to be one of the nations best </h2>
                        <p className='text__para'>
                            "We take pride in being recognized as one of the nation's best healthcare apps. Our commitment to innovation, user-centric design, and exceptional features sets us apart, ensuring a top-tier healthcare experience for our users"
                        </p>

                        <p className='text__para mt-[30px]'>
                        Join us in our journey towards better health, where cutting-edge technology meets compassionate care, making us a trusted and reliable choice in the realm of healthcare solutions. Your well-being is our priority, and we're honored to be among the nation's finest healthcare providers."
                        </p>

                        <Link to='/'>
                            <button className='btn'>Learn More</button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About
