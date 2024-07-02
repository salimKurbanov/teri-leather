'use client'

import Spinner from "../Spinner";
import BasketMenuItem from "./BasketMenuItem";
import Link from "next/link";

export default function BasketMenu({options}) {
    return (
        <div className="basket_menu_block">
            <h2 className="title_menu">Корзина</h2>
            {options.load ?
                <>
                    {options.basket?.length > 0 ?
                    <>
                        <div className="basket_menu_flex">
                            {options.basket.map((e) => (
                                <BasketMenuItem key={e.id} product={e}/>
                            ))}
                        </div>
                        <div className="basket_menu_futter">
                            <Link onClick={options.closeMenu} href={'/basket'} className="main_button">Оформить заказ</Link>
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