'use client'
import Basket from "@/Basket/Basket";
import Store from "@/store/Store";

export default function BasketAddBtn({id, price}) {

    const addProduct = async () => {
        Basket.add(id, price)
        let res = await Basket.updateApi()

        if (res === 'error') {
            Basket.remove(id)
            Store.sendMessage('Не удалось выполнить запрос')
            return
        }
        
        Store.sendMessage('Товар добавлен в корзину')
        Store.setListener('count_main', Basket.count())
    }

    return (
        <button className="main_button" onClick={addProduct}>
            В корзину
        </button>
    );
}