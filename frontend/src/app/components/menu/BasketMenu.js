'use client'

import { useEffect, useState } from "react";
import Basket from "@/Basket/Basket";
import Spinner from "../Spinner";
import BasketMenuItem from "./BasketMenuItem";
import Store from "@/store/Store";
import Link from "next/link";

export default function BasketMenu() {

    const [basket, setBasket] = useState(false)
    let [rerend, setRerend] = useState(false)

    Store.useListener('rerend', setRerend)

    function closeMenu() {
        document.querySelector('.side_menu').classList.remove('active');
        document.body.style.overflow = 'visible'
    }

    useEffect(() => {

        Basket.getApi(setBasket)

    }, [rerend])

    return (
        <div className="basket_menu_block">
            <h2 className="title_menu">Корзина</h2>
            {basket ?
                <>
                    {basket.length > 0 ?
                    <>
                        <div className="basket_menu_flex">
                            {basket.map((e) => (
                                <BasketMenuItem key={e.id} product={e}/>
                            ))}
                        </div>
                        <div className="basket_menu_futter">
                            <Link onClick={closeMenu} href={'/basket'} className="main_button">Оформить заказ</Link>
                        </div>
                    </>
                    : 
                    <div className='basket_empty'>
                        <h3>Здесь пока нет товаров.</h3>
                        <a href='/catalog/all' className='main_button'>Каталог</a>
                    </div>
                }
                </>
            : 
                <div className='basket_empty'>
                    <Spinner />
                </div>
            }
        </div>
    );
}