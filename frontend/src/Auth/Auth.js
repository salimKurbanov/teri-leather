import Api from "@/Api/Api"
import { redirect } from "next/navigation"

const Auth = {}

/*-------- Регистрация нового пользователя ---------*/
Auth.registration = (user, callback) => {
    fetch(`${Api.url}auth/users/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            city: user.city,
            phone: user.tel
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data) {
            localStorage.setItem('user', data.email)
            window.location.replace('/confirmation')
        } else {
            callback(data)
        }
    } )
    .catch(error => console.log(error))
}

/*-------- Запрос на повторную отправку сообщения на почту ---------*/
Auth.resendActivation = () => {

    const email = localStorage.getItem('user')

    fetch(`${Api.url}auth/users/resend_activation/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    } )
    .catch(error => console.log(error))
}

/*-------- Проверка логина ---------*/
Auth.emailVerify = (email, callback) => {
    fetch(`${Api.url}users/email/verify`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
        })
    })
    .then(res => res)
    .then(data => {
        if(data.status === 201) {
            callback('Пользователь с такой почтой уже существует')
        } else if (data.status === 200) {
            callback('OK')
        } else {
            redirect('/404')
        }
    } )
    .catch(error => console.log(error))
}


/*-------- Вход на сайт ---------*/
Auth.login = (email, password, callback)=> {
    fetch(`${Api.url}auth/jwt/create/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.access) {
            localStorage.setItem('accessToken', data.access)
            localStorage.setItem('refreshToken', data.refresh)
            callback(data)
            window.location.reload()
        }
    } )
    .catch(error => console.log(error))
}

/*-------- Получение профиля ---------*/
Auth.profile = (callback)=> {

    const token = localStorage.getItem('accessToken')

    fetch(`${Api.url}auth/users/me/`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Teri ${token}`
        }
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(error => console.log(error))
}

/*-------- Проверка актуальности токена ---------*/
Auth.verify = (callback)=> {

    const token = localStorage.getItem('accessToken')

    fetch(`${Api.url}auth/jwt/verify/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.code == 'token_not_valid') {
            Auth.refresh(callback)
        } else{
            callback(true)
        }
    } )
    .catch(error => console.log(error))
}

/*-------- Рефреш токена ---------*/
Auth.refresh = (callback)=> {

    const token = localStorage.getItem('refreshToken')

    fetch(`${Api.url}auth/jwt/refresh/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refresh: token,
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.access) {
            localStorage.setItem('accessToken', data.access)
            callback(true)
            console.log('refresh')
        } else {
            callback(false)
        }
        
    } )
    .catch(error => console.log(error))
}

/*-------- Выход с аккаунта ---------*/
Auth.logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
}

export default Auth