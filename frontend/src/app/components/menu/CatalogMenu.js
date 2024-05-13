'use client'
import Api from "@/Api/Api";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CatalogMenu() {
    let [tabs, setTabs] = useState([])

    let path = usePathname()
    
    useEffect(() => {
        fetch(`${Api.url}api/product/get_categories/`)
        .then(res => res.json())
        .then(data => setTabs(data))
        .catch(error => console.log(error))
    }, [])

    function closeMenu(){
        document.querySelector('.side_menu').classList.remove('active')
    }

    return (
        <div className='side_menu_content'>
            <div className="catalog_menu">
                <h2>Каталог</h2>
                <div className="catalog_menu_tabs">
                    <Link href={`/catalog/all`} className={path == `/catalog/all` ? 'active': ''}>Все</Link>
                    <Link href={`/catalog/new`} className={path == `/catalog/new` ? 'active': ''}>Новинки</Link>
                    <Link href={`/catalog/popular`} className={path == `/catalog/popular` ? 'active': ''}>Популярные</Link>
                    {tabs.map((el) => (
                        <Link href={`/catalog/${el.slug}`} key={el.id} className={path == `/catalog/${el.slug}` ? 'active': ''} onClick={closeMenu()}>{el.categories_plural}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}