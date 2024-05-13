'use client'

import { useRef, useEffect } from "react";
import PopUpMainSplider from "./PopUpMainSplider";
import PopUpVerticalSplider from "./PopUpVerticalSplider";

export default function ImagePopUp({Image1, Image2, Image3, Image4, Image5}) {

    const main = useRef()
    const vertical = useRef()

    useEffect(() => {
        main.current.sync(vertical.current.splide);
      }, [main, vertical]);
    
      function closeImagePopUp() {
        document.querySelector('.image_popup').classList.remove('open')
        document.body.style.overflow = 'visible'
      }

    return (
        <div className="image_popup">
            <span className="cross" onClick={closeImagePopUp}>X</span>
            <PopUpVerticalSplider vertical={vertical} Image1={Image1} Image2={Image2} Image3={Image3} Image4={Image4} Image5={Image5}/>
            <PopUpMainSplider main={main} Image1={Image1} Image2={Image2} Image3={Image3} Image4={Image4} Image5={Image5}/>
        </div>
    );
}