'use client' 

export default function OpenBtn() {
    
    function openMap() {
        const mapBlock = document.getElementById('map-block');
        const close = document.getElementById('close');

        mapBlock.classList.add('active');
        close.style.opacity = '1';
    }

    return  <button className="map-button" id="map" onClick={openMap}>Открыть карту</button>;
}