import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ImageDrag({image}) {

    let move = false

    let [position, setPosition] = useState({
        x: 0,
        y: 0,
        z: 1
    })

    let [scale, setScale] = useState(1)
    let [start, setStart] = useState({
        x: 0,
        y: 0,
    })

    function imageMove(e) {
        
        if (!move) {
            return
        }
        console.log('mouse', 'X:', e.clientX, 'y:',  e.clientY)
        setPosition({x: e.clientX - start.x, y:  e.clientY - start.y, z: position.z })
    }

    function imageMouseDouwn(e) {
        setStart({ x: e.clientX - position.x, y: e.clientY - position.y})
        e.preventDefault()
        move = true
        document.addEventListener('mousemove', imageMove)   

        document.addEventListener('mouseup', () => {
            move = false
        })
    }

    function imageZoom(e) {
        const delta = e.deltaY * -0.001
        const newScale = position.z + delta
        const ratio = 1 - newScale / position.z
        
        setPosition({
            z: newScale,
            x: position.x + (e.clientX - position.x) * ratio,
            y: position.y + (e.clientY - position.y) * ratio
        })
    }

    console.log('Начальная', start)
    console.log('текущая позиция:', position)
    
    useCallback(() => {
        return () => document.removeEventListener('mousemove', imageMove)
    })

    return (
        <Image src={image}  className="image" onMouseDown={imageMouseDouwn} unoptimized={true} width={0} height={0} alt='' style={{ width: '100%', maxWidth: '70dvh', height: 'auto', transform: `scale(${position.z}) translate(${position.x}px, ${position.y}px)`, transformOrigin: `0 0` }} placeholder='blur' blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z'/>
    );
}