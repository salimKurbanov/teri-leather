'use client'

import { useEffect, useState, useRef } from 'react';
import BasketItem from './components/BasketItem';
import './css/basket.scss';
import Api from '@/Api/Api';
import Count from './components/Count';
import Basket from '@/Basket/Basket';
import BasketExec from './components/BasketExec';
import TotalPrice from './components/TotalPrice';
import Spinner from '../components/Spinner';


export default function BasketPage() {

    const [basket, setBasket] = useState(false)

    useEffect(() => {

        Basket.getApi(setBasket)

    }, [])

    return (
        <div className="basket_block main_container">
            <div className="basket_title">
                <h1>Коризна</h1>
            </div>
            {basket ?
                <>
                    {basket.length > 0 ? 
                        <div className="basket_flex">

                            <div className="basket_content">
                                <Count />
                                <TotalPrice basket={basket}/>
                                <div className="basket_list">

                                    {basket.map((e) => (
                                        <BasketItem key={e.id} product={e}/>
                                    ))}
                                    
                                </div>
                            </div>

                            <BasketExec />
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