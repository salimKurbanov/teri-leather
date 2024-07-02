'use client'

import BasketItem from './components/BasketItem';
import './css/basket.scss';
import Count from './components/Count';
import BasketExec from './components/BasketExec';
import TotalPrice from './components/TotalPrice';
import Spinner from '../components/Spinner';
import useBasket from '@/hooks/useBasket';


export default function BasketPage() {

    const { basket, setBasket, load } = useBasket()

    return (
        <div className="basket_block main_container">
            <div className="basket_title">
                <h1>Коризна</h1>
            </div>
            {load ?
                <>
                    {basket?.length > 0 ?
                        <div className="basket_flex">

                            <div className="basket_content">
                                <p className="product_amount">Товаров: <Count /></p>
                                
                                <TotalPrice basket={basket}/>
                                <div className="basket_list">

                                    {basket.map((e) => (
                                        <BasketItem key={e.id} product={e} setBasket={setBasket}/>
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