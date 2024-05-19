'use client'

import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import useAuth from "@/hooks/useAuth";
import Profile from "./Profile";


export default function ProfileMenu() {

    const [content, setContent] = useState('login')

    let [auth] = useAuth()

    return (
        <div className='side_menu_content'>
            {auth ? 
            <Profile />
            : 
            <>
            <div className="profile_menu_tabs">

                <h3 className={content === 'login' ? "profile_tab active" : 'profile_tab'}  onClick={() => {setContent('login')}}>
                    Авторизация
                </h3>

                <h3 className={content === 'registration' ? "profile_tab active" : 'profile_tab'} onClick={() => {setContent('registration')}}>
                    Регистрация
                </h3>

            </div>

            <div className={content === 'login' ? 'profile_menu_content active' : 'profile_menu_content'}>
                <Login />
            </div>

            <div className={content === 'registration' ? 'profile_menu_content active' : 'profile_menu_content'}>
                <Registration />
            </div> 
            </>
            }
        </div>
    );
}