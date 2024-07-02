'use client'

import Basket from "@/Basket/Basket";
import Store from "@/store/Store";
import { useCallback, useEffect, useState } from "react";

export default function useSideMenu () {

    const [basket, setBasket] = useState([])
    const [load, setLoad] = useState(false)
    const [modalValue, setModalValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    Store.useListener('modal', setModalValue)
    Store.useListener('openMenu', setIsOpen)
    Store.useListener('updateBasketMenu', setBasket)

    function closeMenu() {
        Store.setListener('openMenu', false)
        document.body.style.overflow = 'visible'
    }

    useEffect(() => {

        (async () => {
            let res = await Basket.getApi()
            
            if(res === 'error') {
                return
            }

            setBasket(res)
            setLoad(true)
        })()

        window.addEventListener('click', closeMenu)

        return () => window.removeEventListener('click', closeMenu)
    }, [])

    useCallback(() => {
        return () => window.removeEventListener('click', closeMenu)
    }, [])

    return { basket, load, closeMenu, modalValue, isOpen }
}
