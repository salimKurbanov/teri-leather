import Basket from "@/Basket/Basket"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Store from "@/store/Store"


export default function BasketMenuItem({product}) {

    const [count, setCount] = useState(1)
    const item = useRef(null)

    useEffect(() => {

        let basket = JSON.parse(localStorage.getItem('basket')) || false
        if (product && basket) {
            const foundItem = basket.find(({ id }) => id === product.id)
            if (foundItem) {
                setCount(foundItem.count)
            }
        }

    }, [product])

    const removeBasketItem = async (id) => {
        Basket.remove(id)
        let res = await Basket.updateApi()
        if(res === 'error') {
            return
        }
        Store.setListener('count_main', Basket.count())
        Store.sendMessage('Товар удалён из корзины')
    }

    return (
        <>
            <div className="basket_item_wrapper"  ref={item}>
                <div className="basket_menu_item" >
                    <span className="cross main_cross" onClick={() => removeBasketItem(product.id)}></span>
                    <Link href={`/catalog/detail/${product.slug}`} className="link_image">
                        <Image src={product.Image1} alt="" width={0} height={0} style={{ width: '100%', height: 'auto' }} priority={100} placeholder="blur" unoptimized={true} blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z"/>
                    </Link>
                    <div className="description">
                        <Link href={`/catalog/detail/${product.slug}`} className="title">{product.categories} {product.title}</Link>
                        <p className="color">{product.product_color} <span style={{'background': `${product.color}`}}></span></p>
                        <p className="count">{count} шт.</p>
                        <div className="price">{product.total_price} ₽</div>
                    </div>
                </div>
                <div className="margin_btm"></div>
            </div>
        </>
    );
}