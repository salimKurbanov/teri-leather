import MainSlider from "./MainSlider";

import { Oswald } from "next/font/google";

const oswaldFont = Oswald({subsets: ["latin"], variable: '--font-oswald', display: "swap", });

export default function Main() {
    return (
        <div className="main_block">
            <MainSlider />
            <div className='main_block_title'>
                <h3>Ислям Идрисов</h3>
                <h1 className={oswaldFont.variable}>Teri Leather </h1>
                <p>мастерская кожанных изделий</p>
            </div>
        </div>
    );
}