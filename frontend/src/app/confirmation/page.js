'use client'
import Auth from "@/Auth/Auth"

export default function Confirmation() {

    function sendMessage() {
        Auth.resendActivation()
    }

    return (
        <div className="main_container">
            <div className="confirmation_block">
                <div>Подтвердите аккаунт</div>
                <button className="main_button" onClick={sendMessage}>Повторное письмо</button>
            </div>
        </div>
    
    )   
}