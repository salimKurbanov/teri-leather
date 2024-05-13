'use client' 

import { useSwiper } from 'swiper/react';


export default function SlideNavigation() {
    
    const mainSwiper = useSwiper();
  
    return (
        <div className='swiper_navigation'>
            <div className="swiper_button_right" onClick={() => mainSwiper.slideNext()}>Z</div>
            <div className="swiper_button_left" onClick={() => mainSwiper.slidePrev()}>V</div>
        </div>
    );
}