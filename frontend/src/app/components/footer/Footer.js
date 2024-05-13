import './css/footer.scss'
import logo from './../../../../public/LogoTeri_orange.png'
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer>

            <div className="footer_block">
                <Image src={logo} alt="" className='logo'/>
                
                <nav>
                    <Link href='' className='footer_nav_item'>Главная</Link>
                    <Link href='' className='footer_nav_item'>Клиентам</Link>
                    <Link href='' className='footer_nav_item'>Каталог</Link>
                    <Link href='' className='footer_nav_item'>Корзина</Link>
                    <Link href='' className='footer_nav_item'>Уход за изделиями</Link>
                    <Link href='/contacts' className='footer_nav_item'>Контакты</Link>
                </nav>

                <div className="social">
                    <a href='#' className="footer_icon_inst"></a>
                    <a href='#' className="footer_icon_tg"></a>
                    <a href='#' className="footer_icon_vk"></a>
                    <a href='#' className="footer_icon_wapp"></a>
                </div>

                <div className="policy_block">
                    <Link href='#' className='policy_item'>политика конфиденциальности</Link>
                    <Link href='#' className='policy_item'>пользовательское соглашение</Link>
                </div>

                <div className="line"></div>

                <div className="copyright">
                    © Copyright 2024 Teri Leather
                </div>

                <div className="cookie_notice">
                    *Данный сайт использует технологию Cookies, позволяющую анализировать поведение пользователей на сайте.
                </div>
            </div>

        </footer>
    );
};