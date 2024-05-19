import Api from "@/Api/Api"
import { notFound } from 'next/navigation';


async function activateUser(uid, token) {
    const res = await fetch(`${Api.url}auth/users/activation/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'uid': uid,
            'token': token
        })
    })

    if (res.status !== 204) {
        return notFound()
    }

    return res
}

export default async function ActivatePage({params}) {

    const activate = await activateUser(params.uid, params.token)

    return (
        <div>Ваш аккаунт подтверждён</div>
    );
}