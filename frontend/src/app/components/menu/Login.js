import { useState } from "react";
import Auth from "@/Auth/Auth";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({})
    const [msg, setMsg] = useState('');

    function login(e) {
        e.preventDefault()
        Auth.login(email, password, setData)
        if(data.detail) {
            setMsg(data.detail)
        } 
    }

    return (
        <div className='login_block'>
            <form action="" onSubmit={(e) => login(e)}>
                {msg && <p className="error">{msg}</p>}
                <label htmlFor="" className='form_label'>Логин</label>
                <input type="text" className={`form_input ${msg ? 'error_input': ''}`} placeholder='Введите логин' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="" className='form_label'>Пароль</label>
                <input type="password" className={`form_input ${msg ? 'error_input': ''}`} placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="main_button">Войти</button>
            </form>
        </div>
    );
}