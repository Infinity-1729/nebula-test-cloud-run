
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { scrollContext } from "../pages/_app";
import SwiperCore, {
    Autoplay,
    Pagination
} from 'swiper/core';
SwiperCore.use([Autoplay, Pagination]);
export default function Swipercarousel2() {
    const { snap } = useContext(scrollContext)
    return (
        <>
            <h1 style={{ scrollSnapAlign: snap }} className='text-center bg-purple-300 mt-2rem py-1rem text-4xl'>
                Manufaturing Excellence
            </h1>
            <div className='py-1rem'>
                <Swiper
                    slidesPerView={1.5}
                    centeredSlides={true}
                    // pagination={{
                    //     "clickable": true
                    // }}
                    loop={true}
                    autoplay={{ "delay": 1500, disableOnInteraction: false }}
                    className="mySwiper2">
                    {['Raw Materials', 'Advanced Technology', 'Quality Inspection', 'Pallet Packaging', 'On time Dispatch'].map(e =>
                        <SwiperSlide key={e}>
                            <div className='px-3rem'>
                                <img src={`/menufecturing excellence/${e}.jpg`} alt="" />
                                <h2 className='text-3xl p-0.5em pl-0 mb-2rem'>{e}</h2>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    )
}