import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    return (
        <div className='login_block'>
            <form action="">
                <label htmlFor="" className='form_label'>Логин</label>
                <input type="text" className='form_input' placeholder='Введите логин' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="" className='form_label'>Пароль</label>
                <input type="password" className='form_input' placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Войти</button>
            </form>
        </div>
    );
}