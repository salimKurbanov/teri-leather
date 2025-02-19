'use client'

import { useEffect, useState } from "react";
import Basket from "@/Basket/Basket";
import Spinner from "../Spinner";
import BasketMenuItem from "./BasketMenuItem";

export default function BasketMenu() {

    const [basket, setBasket] = useState(false)

    useEffect(() => {

        Basket.getApi(setBasket)

    }, [])

    return (
        <div className="basket_menu_block">
            <h2 className="title">Корзина</h2>
            {basket ?
                <>
                    {basket.length > 0 ?
                        <div className="basket_menu_flex">
                            {basket.map((e) => (
                                <BasketMenuItem key={e.id} product={e}/>
                            ))}
                        </div>
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