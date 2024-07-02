'use client'

import './css/components.scss'

import Logo from './../../../public/LogoTeri_orange.png'
import Image from 'next/image';
import Store from './../../store/Store.js';
import { useEffect, useRef, useState } from 'react';
import ManiCount from './MainCount';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SideMenu from './menu/SideMenu';

const Aside = () => {

    const path = usePathname()
    const btn = useRef(null)
    const menu = useRef(null)

    const modalValue = (e, el) => {
        Store.setListener('modal', el)
        if(btn.current === e.target && menu.current?.classList.contains('active')) {
            Store.setListener('openMenu', false)
            document.body.style.overflow = 'visible'
        } else {
            Store.setListener('openMenu', true)
            document.body.style.overflow = 'hidden'
            btn.current = e.target
        }
    }

    return (
        <>
            <div className='aside' onClick={(e) => e.stopPropagation()}>
                <nav>
                    {path == '/basket' ? 
                        <Link className='icon_cart cart' href={'/basket'}>
                            <ManiCount />
                        </Link>
                        :
                        <div className='icon_cart cart' onClick={(e) => modalValue(e, 'cart')}>
                            <ManiCount />
                        </div>
                    }
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

            <SideMenu menu={menu}/>
        </>
            
    );
};

export default Aside;