'use client'

import 'swiper/css';
import './../styles/swiper.scss';

import main from  './../../../public/main2.jpg'
import main3 from './../../../public/main3.jpg'
import main2 from './../../../public/main4.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay} from 'swiper/modules';
import Image from 'next/image';


export default function MainSlider() {
    return (
        <Swiper
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            speed={3000}
            navigation={{
                nextEl: '.swiper_button_right',
                prevEl: '.swiper_button_left'
            }}
            modules={[Navigation, Autoplay ]}
            className='main_swiper'
        >
            <SwiperSlide><Image src={main} alt="" placeholder='blur'/></SwiperSlide>
            <SwiperSlide><Image src={main3} alt="" placeholder='blur'/></SwiperSlide>
            <SwiperSlide><Image src={main2} alt="" placeholder='blur'/></SwiperSlide>
        </Swiper>
    );
}