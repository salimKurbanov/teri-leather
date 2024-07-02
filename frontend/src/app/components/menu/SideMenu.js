'use client'

import { useCallback, useEffect, useState } from "react";
import Store from './../../../store/Store';
import CatalogMenu from "./CatalogMenu.js";
import ProfileMenu from "./ProfileMenu";
import BasketMenu from "./BasketMenu";
import useSideMenu from "@/hooks/useSideMenu";

export default function SideMenu({menu}) {

    const { basket, load, closeMenu, isOpen, modalValue } = useSideMenu()

    return (
        <div className={`side_menu ${isOpen ? 'active' : ''}`} ref={menu} onClick={(e) => e.stopPropagation()}>
            <div className="close_side" onClick={closeMenu}>X</div>
            {modalValue === 'catalog' && <CatalogMenu />}
            {modalValue === 'profile' && <ProfileMenu />}
            {modalValue === 'cart' && <BasketMenu options={{basket, load, closeMenu}} />}
        </div>
    );
}