import Basket from "@/Basket/Basket"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"


export default function BasketMenuItem({product}) {

    let [count, setCount] = useState(1)

    useEffect(() => {
        let basket = JSON.parse(localStorage.getItem('basket'))

        setCount(basket.find(({id}) => id === product.id).count)

    }, [])

    function minus() {
        if(count <= 1) {
            return false
        }
        Basket.minus(product.id)
        setCount(prev => prev - 1)
        Store.setListener('count', prev => prev - 1)
        Store.setListener('count_main', prev => prev - 1)
        Store.setListener('total_price', Basket.totalPrice())

        let p = document.createElement('p')
        p.textContent = 'Кол-во товара уменьшено'
        document.getElementById('main_message').append(p)

        setTimeout(() => {
            p.classList.add('remove')
            setTimeout(() => {
                p.remove()
            }, 1500)
        }, 3000)
    }

    function plus() {
        Basket.plus(product.id)
        setCount(prev => prev + 1)
        Store.setListener('count', prev => prev + 1)
        Store.setListener('count_main', prev => prev + 1)
        Store.setListener('total_price', Basket.totalPrice())

        let p = document.createElement('p')
        p.textContent = 'Кол-во товара увеличено'
        document.getElementById('main_message').append(p)

        setTimeout(() => {
            p.classList.add('remove')
            setTimeout(() => {
                p.remove()
            }, 1500)
        }, 3000)
    }

    function removeBasketItem(id) {
        const item = document.getElementById(id)
        item.classList.add('red')
        setTimeout(() => {
            item.classList.add('remove')
        }, 500)
        setTimeout(() => {
            item.classList.add('height')
        }, 1300)
        setTimeout(() => {
            item.remove()
        }, 2500)
        Basket.remove(id)

        const count = Basket.count()

        if(count === 0) {
            Store.setListener('rerender', prev => !prev)
        }

        Store.setListener('count', count)
        Store.setListener('count_main', count)
        Store.setListener('total_price', Basket.totalPrice())

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
        <div className="basket_menu_item">
            <Link href={`/catalog/detail/${product.slug}`} className="link_image">
                <Image src={product.Image1} alt="" width={0} height={0} style={{ width: '100%', height: 'auto' }} priority={100} placeholder="blur" unoptimized={true} blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z"/>
            </Link>
        </div>
    );
}