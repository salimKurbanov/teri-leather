'use client'

import Link from 'next/link';
import './css/components.scss'
import { usePathname } from 'next/navigation';


export default function Header() {

    const path = usePathname()

    return (
        <header>
            <div className="logo">
                Teri Leather
            </div>
            <nav>
                <Link href="/" className={`link ${path == '/' ? 'active': ''}`}>Главная</Link>
                <Link href="/catalog/all" className={`link ${path == '/catalog/all' ? 'active': ''}`}>Каталог</Link>
                <Link href="/basket" className={`link ${path == '/basket' ? 'active': ''}`}>Корзина</Link>
                <Link href="" className={`link ${path == '' ? 'active': ''}`}>Клиентам</Link>
            </nav>
        </header>
    );
}