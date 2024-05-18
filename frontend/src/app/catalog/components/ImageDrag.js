import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ImageDrag({image}) {

    let [position, setPosition] = useState({
        x: 0,
        y: 0,
        z: 1
    })

    let start = {
        x: 0,
        y: 0,
    }

    function imageMouseDouwn(e) {
        start = {x: e.clientX, y: e.clientY}

        document.addEventListener('mousemove', imageMove)

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', imageMove)
        })
    }

    function imageMove(e){
        setPosition({x: position.x + (e.clientX - start.x), y:  position.y + (e.clientY - start.y), z: position.z })
        
    }

    function imageZoom(e) {
        let delta = -e.deltaY 
        var xs = (e.clientX - position.x) / position.z,
            ys = (e.clientY - position.y) / position.z

        if (delta > 0) {
            if (position.z < 6) {
                position.z *= 1.2
            }
        } else if (delta < 0) {
            if (position.z > 0.3) {
                position.z /= 1.2
            }
        }

        
        setPosition({
          z: position.z,
          x: position.x - xs * position.z,
          y: position.y - ys *position.z
        });
    }

    useCallback(() => {
        return () => document.removeEventListener('mousemove', imageMove)
    })

    return (
        <Image src={image}  className="image" onWheelCapture={imageZoom} onMouseDown={(e) => imageMouseDouwn(e)} unoptimized={true} width={0} height={0} alt='' style={{ width: '100%', maxWidth: '70dvh', height: 'auto', transform: `scale(${position.z}) translate(${position.x}px, ${position.y}px)`, transformOrigin: `0 0` }} placeholder='blur' blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoADUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z'/>
    );
}
// 