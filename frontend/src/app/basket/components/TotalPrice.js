import Basket from "@/Basket/Basket";
import Store from "@/store/Store";
import { useEffect, useState } from "react";


export default function TotalPrice() {

    let [totalPrice, setTotalPrice] = useState(0)

    Store.useListener('total_price', setTotalPrice)

    useEffect(() => {

        setTotalPrice(Basket.totalPrice())

    }, [])

    return <p className='basket_cost'>Стоимость корзины: <span>{totalPrice} ₽</span></p>;
}