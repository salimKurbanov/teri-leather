'use client'

import Link from "next/link";
import './../css/catalog.scss';
import { usePathname } from "next/navigation";


export default function TabsList({tabs}) {

    let path = usePathname()

    return (

        <nav className='catalog_navigations'>
            <Link href={`/catalog/all`} className={path == `/catalog/all` ? 'active': ''}>Все</Link>
            <Link href={`/catalog/new`} className={path == `/catalog/new` ? 'active': ''}>Новинки</Link>
            <Link href={`/catalog/popular`} className={path == `/catalog/popular` ? 'active': ''}>Популярные</Link>
            {tabs.map((el) => (
                <Link href={`/catalog/${el.slug}`} key={el.id} className={path == `/catalog/${el.slug}` ? 'active': ''}>{el.categories_plural}</Link>
            ))}

        </nav>
    );

}