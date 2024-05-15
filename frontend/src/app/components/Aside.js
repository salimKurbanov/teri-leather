'use client'

import './css/components.scss'

import Logo from './../../../public/LogoTeri_orange.png'
import Image from 'next/image';
import Store from './../../store/Store.js';
import { useEffect, useState } from 'react';
import ManiCount from './MainCount';

const Aside = () => {

    const [btn, setBtn] = useState('')

    function modalValue(e, el) {
        const sideMenu = document.querySelector('.side_menu')
        Store.setListener('modal', el)
        if(btn === e.target && sideMenu.classList.contains('active')) {
            sideMenu.classList.remove('active')
        } else {
            sideMenu.classList.add('active')
            setBtn(e.target)
        }
    }

    return (
            <div className='aside' onClick={(e) => e.stopPropagation()}>
                <nav>
                    <div className='icon_cart cart' onClick={(e) => modalValue(e, 'cart')}>
                        <ManiCount />
                    </div>
                    <div className='icon_profile' onClick={(e) => modalValue(e, 'profile')}></div>
                    <div className='icon_search' onClick={(e) => modalValue(e, 'search')}></div>
                </nav>

                <div className="burger_field" onClick={(e) => modalValue(e, 'catalog')}>
                    <div className="burger">
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <Image src={Logo} alt="Teri Leather" placeholder='blur' className='logo_aside'/>
            </div>
    );
};

export default Aside;