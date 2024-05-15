'use client'
import Basket from "@/Basket/Basket";
import { createElement } from "react";
import Store from "@/store/Store";

export default function BasketAddBtn({id, price}) {

    function addProduct() {
        let p = document.createElement('p')
        p.textContent = 'Товар добавлен в корзину'
        document.getElementById('main_message').append(p)
        Basket.add(id, price)

        setTimeout(() => {
            p.classList.add('remove')
            setTimeout(() => {
                p.remove()
            }, 1500)
        }, 3000)
        
        Store.setListener('count_main', Basket.count())
    }

    return (
        <button className="main_button" onClick={addProduct}>
            В корзину
        </button>
    );
}