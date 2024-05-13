import Link from 'next/link';
import './../css/catalog.scss';
import ProductList from './../components/ProductList';
import { notFound } from 'next/navigation';
import TabsList from '../components/TabsList';
import Api from '@/Api/Api';

async function getCategoriesList() {
    const res = await fetch(`${Api.url}api/product/get_categories/`)

    if (!res.ok) {
        return notFound()
    }

    return res.json()
}
 
export default async function Catalog({params}) {

    const categoriesList = await getCategoriesList()

    return (
        <div className='catalog'>
            
            <h2 className="main_catalog_title">Каталог</h2>

            <TabsList tabs={categoriesList}/>

            <ProductList category={params.categories}/>

        </div>
    );
}