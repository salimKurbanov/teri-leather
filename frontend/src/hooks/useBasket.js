'use client'

import Basket from "@/Basket/Basket"
import { useEffect, useState } from "react"

export default function useBasket() {

    const [basket, setBasket] = useState([])
    let [load, setLoad] = useState(false)

    useEffect(() => {

        (async () => {
            let res = await Basket.getApi()
            
            if(res === 'error') {
                return
            }

            setBasket(res)
            setLoad(true)
        })()

    }, [])

    return { basket, setBasket, load }

}