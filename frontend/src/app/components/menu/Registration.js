import { useState } from "react"

export default function Registration() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [tel, setTel] = useState('')
    const [msg, setMsg] = useState('')

    return (
        <div className='register_block'>
            <form action="">

                <label htmlFor="" className="form_label">Имя</label>
                <input type="text" className="form_input" value={firstName} placeholder='Введите имя' onChange={(e) => setFirstName(e.target.value)}/>

                <label htmlFor="" className="form_label">Фамилия</label>
                <input type="text" className="form_input" value={lastName} placeholder='Введите фамилию' onChange={(e) => setLastName(e.target.value)}/>

                <label htmlFor="" className="form_label">Email</label>
                <input type="text" className="form_input" value={email} placeholder='Введите email' onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="" className="form_label">Пароль</label>
                <input type="password" className="form_input" value={password} placeholder='Придумайте пароль' onChange={(e) => setPassword(e.target.value)}/>

                <label htmlFor="" className="form_label">Подтверждение пароля</label>
                <input type="password" className="form_input" value={confPassword} placeholder='Подтвердите пароль' onChange={(e) => setConfPassword(e.target.value)}/>

                <label htmlFor="" className="form_label">Телефон</label>
                <input type="tel" className="form_input" value={tel} placeholder='Введите номер телефона' onChange={(e) => setTel(e.target.value)}/>

                <button className='regBtn'>Зарегистрироваться</button>
            </form>
        </div>
    );
}