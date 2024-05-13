import CloseBtn from './components/CloseBtn';
import OpenBtn from './components/OpenBtn';
import './css/contacts.scss';


export default function Contacts() {

    return (
        <div className="contacts">
            <div className="contacts_map" id="map-block">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c581effa8c91237cab033f931ab1658ea589b78eb9e77784cdbf099e8e0e92a&amp;source=constructor" frameborder="0"></iframe>
                <CloseBtn />
            </div>
            <div className="contacts_container">
                <div className="contacts_adress"><span><span className="location"></span>респ. Крым,</span><span>г. Симферополь,</span> <span>ул. Темиз, д16.</span> </div>
                <div className="contacts_phone"><a href="tel:+79781758569">+7(978)-175-85-69</a></div>
                <div className="contacts_mail">TeriLeather@mail.ru</div>
                <div className="contacts_work_time">
                    Часы работы:
                    <span>Пн-Пт 08:00 до 18:00</span>
                </div>
                <OpenBtn />
            </div>
            <div className="contacts_bottom">
                <div className="contacts_bottom_part">
                    <ul className="contacts_requisites">
                        <li><span>ИНН:</span> 895655423</li>
                        <li><span>КПП:</span> 56156641</li>
                        <li><span>ОГРН:</span> 64656516516</li>
                        <li><span>Расч. счёт:</span> 1654531351516541651541</li>
                        <li><span>Корр. счёт:</span> 5598454654000000008456</li>
                        <li><span>БИК:</span> 03221000000</li>
                    </ul>
                </div>
                <div className="contacts_bottom_part right">
                    <div className="contacts_social">
                        <a href="" className="contacts_social_item bi-facebook"></a>
                        <a href="" className="contacts_social_item bi-instagram"></a>
                        <a href="" className="contacts_social_item bi-telegram"></a>
                        <a href="" className="contacts_social_item bi-twitter"></a>
                    </div>
                </div>
            </div>
        </div>
    );
}