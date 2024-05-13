import Image from "next/image";
import about from './../../../public/about.jpg'

import { Oswald } from "next/font/google";

const oswaldFont = Oswald({subsets: ["latin"], variable: '--font-oswald' });

export default function AboutUsBlock() {
    return (
        <div className="about_block">
            <div className="logo">
                <h1 className={oswaldFont.variable}>Teri Leather </h1>
            </div>
            <div className="description">
                <h3>Только модные и качественные аксессуары</h3>
                <p> У нас Вы найдёте всё, что Вам так нужно. Ассортимент магазина постоянно расширяется и дополняется в зависимости от пожеланий клиентов.
                Мы ценим каждого нашего покупателя и готовы предоставить высокий уровень обслуживания.</p>
            </div>
        </div>

        
    );
}