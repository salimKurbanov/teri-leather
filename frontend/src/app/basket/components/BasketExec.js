'use client'
import box from './../images/box.png'
import courier from './../images/courier.png'
import sedan from './../images/sedan.png'
import cheque from './../images/cheque.png'

import Image from 'next/image';
import { useEffect, useState } from 'react'

export default function BasketExec() {

    const isAuth = false

    const [deliveryOptions, setDeliveryOptions] = useState('')

    return (
        <div className="basket_execution">

            <form action="">
                {!isAuth && 

                <div className='personal_data'>
                    <h2 className='order_title'>Персональная ифнормация</h2>

                    <label htmlFor="" className='form_label'>Адрес эл. почты</label>

                    <input type="text" className='form_input'/>

                    <div className="personal_info">

                        <div className="personal_info_item">
                            <label htmlFor="" className="form_label">Фамилия</label>
                            <input type="text" className="form_input" />
                        </div>

                        <div className="personal_info_item">
                            <label htmlFor="" className="form_label">Имя</label>
                            <input type="text" className="form_input" />
                        </div>

                        <div className="personal_info_item">
                            <label htmlFor="" className="form_label">Отчество</label>
                            <input type="text" className="form_input" />
                        </div>

                        <div className="personal_info_item">
                            <label htmlFor="" className="form_label">Телефон</label>
                            <input type="tel" className="form_input" value='+7'/>
                        </div>

                    </div>

                </div>

                }

                {isAuth && 
                <div className='personal_data'>

                    <h2 className='order_title'>Персональная ифнормация</h2>

                    <label htmlFor="" className="form_label">Ф.И.О</label>
                    <p>Курбанов Салим Ильясович</p>

                    <label htmlFor="" className="form_label">Адрес эл. почты</label>
                    <p>salim.kurbanov@mail.ru</p>

                    <label htmlFor="" className="form_label">Телефон</label>
                    <p>+76785233465</p>

                </div>
                }

                <div className="delivery">
                    <h2 className="order_title">Доставка</h2>
                    <label htmlFor="" className="form_label">Выберите способ доставки</label>

                    <div className="delivery_option">

                        <div className={`option_item ${deliveryOptions == 'pickup' ? 'active': ''}`} onClick={() => setDeliveryOptions('pickup')}>
                            <div className='radio_btn' id='pickup' />
                            <label className='option_content' htmlFor="pickup" >
                                <Image src={sedan} alt=''/>
                                <h4>Самовывоз</h4>
                                <div className="delivery_cost">
                                    <Image className='cheque' src={cheque} alt=''/>
                                    <p>Бесплатно</p>
                                </div>
                            </label>
                        </div>

                        <div className={`option_item ${deliveryOptions == 'post' ? 'active': ''}`} onClick={() => setDeliveryOptions('post')}>
                            <div className='radio_btn' id='post' />
                            <label className='option_content' htmlFor="post" >
                                <Image src={box} alt=''/>
                                <h4>Почта России</h4>
                                <div className="delivery_cost">
                                    <Image className='cheque' src={cheque} alt=''/>
                                    <p>от 200 руб.</p>
                                </div>
                            </label>
                            
                        </div>

                        <div className={`option_item ${deliveryOptions == 'courier' ? 'active': ''}`} onClick={() => setDeliveryOptions('courier')}>
                            <div className='radio_btn' id='courier' />
                            <label className='option_content' htmlFor="courier" >
                                <Image src={courier} alt=''/>
                                <h4>Курьером</h4>
                                <div className="delivery_cost">
                                    <Image className='cheque' src={cheque} alt=''/>
                                    <p>от 300 руб.</p>
                                </div>
                            </label>
                        </div>

                    </div>

                    {deliveryOptions == 'pickup' && 
                    <div className='option_description'>
                        <p>Вы можете забрать товар в любой удобный для вас день с 9:00 до 18:00 МСК.</p>
                        <h3>Адрес нашего магазина:</h3>
                        <p className='addres'>Республика Крым, г. Симферополь, мк. р-н Фонтаны, ул. Темиз, 16</p>
                    </div>}

                    {deliveryOptions == 'post' && 
                    <div className='option_description'>
                        <p>Укажите адрес для доставки товара через Почту России.</p>
                        <p>Стоимость дставки в пределах респ. Крым - от 200 р. Стоимость дставки по России - от 300 р.</p> 
                        <label htmlFor="" className="form_label">Введите адрес</label>
                        <input type="text" className="form_input" />
                    </div>}

                    {deliveryOptions == 'courier' && 
                    <div className='option_description'>
                        <p>Доставка курьером осуществляется в день или на следующий день после заказа</p>
                        <p>Стоимость доставки по г. Симферополь от 300 руб. и от 400 руб. по Крыму </p>
                        <label htmlFor="" className="form_label">Введите адрес</label>
                        <input type="text" className="form_input" />
                    </div>}

                </div>
                <div className="payment_block">
                    <h2 className="order_title">Оплата</h2>
                    <label htmlFor="" className="form_label">Выберите способ оплаты</label>
                    
                </div>
            </form>
            

        </div>
    );
};