import Basket from "@/Basket/Basket"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Store from "@/store/Store"
import { usePathname } from "next/navigation"


export default function BasketMenuItem({product}) {

    let [count, setCount] = useState(1)
    let path = usePathname() 

    useEffect(() => {
        let basket = JSON.parse(localStorage.getItem('basket'))

        setCount(basket.find(({id}) => id === product.id).count)

    }, [])

    function removeBasketItem(id) {
        const items = document.querySelectorAll(`[data-id='${id}']`)

        if(items) {
            items.forEach(element => {
                element.classList.add('red')
                setTimeout(() => {
                    element.classList.add('remove')
                }, 500)
                setTimeout(() => {
                    element.classList.add('height')
                }, 1300)
                setTimeout(() => {
                    element.remove()
                }, 2500)
            });
        }
       
        Basket.remove(id)

        const count = Basket.count()

        if(path == '/basket') {
            if(count === 0) {
                setTimeout(() => {
                    Store.setListener('rerender', prev => !prev)
                    Store.setListener('reren', prev => !prev)
                }, 3000)
                
            }
            Store.setListener('count', count)
            Store.setListener('count_main', count)
            Store.setListener('total_price', Basket.totalPrice())
        }

        let p = document.createElement('p')
        p.textContent = 'Товар удалён из корзины'
        document.getElementById('main_message').append(p)

        setTimeout(() => {
            p.classList.add('remove')
            setTimeout(() => {
                p.remove()
            }, 1500)
        }, 3000)

    }

    return (
        <div className="basket_item_wrapper" data-id={product.id}>
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
        
    );
}