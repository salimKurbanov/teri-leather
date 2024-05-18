'use client'

import { useEffect, useState } from "react";
import Store from './../../../store/Store';
import CatalogMenu from "./CatalogMenu.js";
import ProfileMenu from "./ProfileMenu";
import BasketMenu from "./BasketMenu";


export default function SideMenu() {

    const [modalValue, setModalValue] = useState('')

    Store.useListener('modal', setModalValue) 

    function closeMenu() {
        document.querySelector('.side_menu').classList.remove('active');
        document.body.style.overflow = 'visible'
    }

    useEffect(() => {

        window.addEventListener('click', () => {
            document.querySelector('.side_menu').classList.remove('active');
            document.body.style.overflow = 'visible'
        })

    }, [])
    

    return (
        <div className="side_menu" onClick={(e) => e.stopPropagation()}>
            <div className="close_side" onClick={closeMenu}>X</div>
            {modalValue === 'catalog' && <CatalogMenu />}
            {modalValue === 'profile' && <ProfileMenu />}
            {modalValue === 'cart' && <BasketMenu />}
        </div>
    );
}