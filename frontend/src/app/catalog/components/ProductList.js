import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Api from "@/Api/Api"
import BasketAddBtn from "@/app/components/BasketAddBtn"

async function getProductList(category) {
    let res = await fetch(`${Api.url}api/product/catalog/${category}`, {next: { revalidate: 2 } })

    if (!res.ok) {
        return 'error'
    }

    res = await res.json()
    return res
}

export default async function ProductList({category}) {

    const productList = await getProductList(category)

    if(productList === 'error' || productList?.length === 0) {
        return (
            <div className="not-products">
                <p>Товаров по данной категории не найдено</p>
                <Link href={'/catalog/all'} className="main_button">Все товары</Link>
            </div>
        )
    }

    return (
        <div>
            <div className='product_list'>
                {productList?.length 
                ? productList.map((el) => (
                    <div key={el.id} className='catalog_card'>
                        
                        <Link href={`/catalog/detail/${el.slug}`} className="image_link">
                            <Image src={el.Image1} alt="Product" width={0} height={0} style={{ width: '100%', height: 'auto' }} priority={100} placeholder="blur" unoptimized={true} blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z"/>
                            <div className="labels">
                                {el.new && 
                                <div className="new_label">
                                    New
                                </div>}
                                {el.discount > 0 && 
                                <div className="discount">
                                    -{el.discount}%
                                </div>}
                            </div>
                        </Link>
                        <div className="card_description">
                            <div className="shades">
                                {el.shades.map((e) => (
                                    <Link href={`/catalog/detail/${el.slug}`} key={e.id} style={{'background': e.color}}></Link>
                                ))}
                            </div>
                            <Link href={`/catalog/detail/${el.slug}`} className={"card_title"}>{el.categories} / {el.title}</Link>
                            {el.discount > 0 && <p className='card_old_price'>{el.price} ₽</p>}
                            <p className='card_price'>{(el.total_price).toFixed(2)} ₽</p>
                            <BasketAddBtn id={el.id} price={(el.total_price).toFixed(2)}/>
                        </div>
                    </div>
                )) 
                :<></>}
            </div>
        </div>
    );
}