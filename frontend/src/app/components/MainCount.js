import Basket from '@/Basket/Basket';
import Store from '@/store/Store';
import { useEffect, useState } from 'react';


export default function ManiCount() {
    
    let [count, setCount] = useState(0)
    Store.useListener('count_main', setCount)

    useEffect(() => {

        setCount(Basket.count())
        
    }, [])

    return <>{count ? <div className="count">{count}</div>: ''}</>
}