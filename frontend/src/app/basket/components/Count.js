'use client'

import Basket from "@/Basket/Basket"
import Store from "@/store/Store"
import { useEffect, useState } from "react"

export default function Count() {

    let [count, setCount] = useState(0)

    Store.useListener('count', setCount)

    useEffect(() => {

        setCount(Basket.count())

    }, [])

    return <>{count}</>
};
