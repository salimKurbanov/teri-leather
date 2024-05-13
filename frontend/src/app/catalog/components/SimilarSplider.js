'use client'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from "next/link";

import '@splidejs/react-splide/css';
import Image from 'next/image';


export default function SimilarSplider({similar}) {
    return (
        <Splide 
            options={ {
                rewind       : true,
                gap          : '5px',
                autoplay     : false,
                pauseOnHover : true,
                autoWidth    : true,
                autoHeight   : true,
                //perPage      : 'auto',
                perMove      : 1,
                padding      : '50px',
                interval     : 8000,
                speed        : 3000,
                arrows       : true,
                pagination   : false,
                breakpoints: {
                    768: {
                        padding: '10px',
                        arrows: false,
                    }
                }
            } } 
            className='similar_splider'
            aria-label="My Favorite Images">

            {similar.map((el) => (
                <SplideSlide key={el.id}>
                    <Link  href={`/catalog//detail/${el.slug}`} >
                        <Image src={el.Image1} unoptimized={true} width={0} height={0} alt='' style={{ width: '100%', height: 'auto' }} placeholder='blur' blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z'/>
                    </Link>
                    <Link  href={`/catalog//detail/${el.slug}`} ><h3 className="title">{el.categories} / {el.title}</h3></Link>
                </SplideSlide>
            ))}
            
        </Splide>
    );
}