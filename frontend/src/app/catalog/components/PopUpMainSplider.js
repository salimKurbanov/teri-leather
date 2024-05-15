'use client'
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
import Image from 'next/image';
import ImageDrag from './ImageDrag';

export default function PopUpMainSplider({main, images}) {
    return (
        <Splide 
            ref={(splider) => (main.current = splider)}
            options={ {
            rewind       : true,
            gap          : '5px',
            autoplay     : false,
            autoWidth    : true,
            autoHeight   : true,
            perPage      : 1,
            padding      : '0px',
            speed        : 1000,
            arrows       : true,
            drag: false,
            pagination: false,
            breakpoints: {
                768: {
                    arrows: false,
                }
            }
          } } 
          className='main_splider'
          aria-label="My Favorite Images">

            {images.map((el) => (
                <>
                    {el && 
                        <SplideSlide>
                            <ImageDrag image={el} />
                        </SplideSlide>
                    }
                </>
            ))}
        </Splide>
    );
}