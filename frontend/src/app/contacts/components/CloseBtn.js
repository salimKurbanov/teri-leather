'use client' 

export default function CloseBtn() {

    function closeMap() {
        const mapBlock = document.getElementById('map-block');
        const close = document.getElementById('close');

        mapBlock.classList.remove('active');
        close.style.opacity = '0';
    }

    return <button className="map-button" id="close" onClick={closeMap}>Закрыть карту</button>;
}