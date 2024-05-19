'use client'

import Auth from "@/Auth/Auth"
import { useEffect, useState } from "react"

export default function useAuth() {

    const [auth, setAuth] = useState(false)

    useEffect(() => {

        let token = localStorage.getItem('accessToken')

        if(token) {
            Auth.verify(setAuth)
        } else {
            setAuth(false)
        }

    }, [auth])

    console.log(auth)

    return [auth];
}