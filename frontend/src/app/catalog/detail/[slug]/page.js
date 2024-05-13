import './../../css/catalog.scss'
import Link from 'next/link'
import ProductSplider from '../../components/ProductSplider'
import { notFound } from 'next/navigation'
import Api from '@/Api/Api'
import BasketAddBtn from '@/app/components/BasketAddBtn'
import SimilarList from '../../components/SimilarList'
import ViewsList from '../../components/ViewsList'
import ImagePopUp from '../../components/ImagepopUp'

async function getProductDetail(slug) {

    const res = await fetch(`${Api.url}api/product/${slug}`)

    if (!res.ok) {
        return notFound()
    }

    return res.json()
}


export default async function productDetail({params}) {

    const product = await getProductDetail(params.slug)

    return (
        <div className="product_detail_block">
            <div className='product_container'>

                <ProductSplider Image1={product.Image1} Image2={product.Image2} Image3={product.Image3} Image4={product.Image4} Image5={product.Image5}/>

                <div className="product_description">
                    <label htmlFor="" className='product_cat'>{product.categories}</label>
                    <h2>{product.title} <span className='color' style={{"background": product.color}}></span></h2>
                    <h3>Доступные цвета</h3>
                    <div className="shades">
                        {product.shades && product.shades.map((e) => (
                            <Link key={e.id} href={`/catalog//detail/${e.slug}`} style={{'background': e.color}}></Link>
                        ))}
                    </div>
                    <div>
                        {product.discount > 0 && <p className="old_price">{product.price} ₽</p>}
                        <p className="price">{(product.total_price).toFixed(2)} ₽</p>
                    </div>
                    <BasketAddBtn id={product.id} price={(product.total_price).toFixed(2)}/>
                    <p>{product.descriprion}</p>
                </div>
            </div>

            <SimilarList id={product.id}/>
            <ViewsList id={product.id}  />
            <ImagePopUp Image1={product.Image1} Image2={product.Image2} Image3={product.Image3} Image4={product.Image4} Image5={product.Image5}/>
        </div>
    );
}