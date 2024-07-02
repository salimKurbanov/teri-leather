import Auth from "@/Auth/Auth";
import { useState } from "react"

export default function Registration() {

    let [mes, setMsg] = useState('')

    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/;

    const [input, setInput] = useState({
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confPassword: '',
      tel: '',
    });
   
    const [error, setError] = useState({
        email: false,
        first_name: false,
        last_name: false,
        password: false,
        confPassword: false,
        tel: false,
    })
   
    const onInputChange = e => {
      const { name, value } = e;
      setInput(prev => ({
        ...prev,
        [name]: value
      }));
      
      validateInput(e);
    }
   
    const validateInput = e => {
      let { name, value } = e;
      setError(prev => {
        const stateObj = { ...prev, [name]: "" };
   
        switch (name) {
          case "first_name":
            if (!value) {
              stateObj[name] = "Обязательное поле";
            } else {
              stateObj[name] = 'OK'
            }
            break;

          case "last_name":
            if (!value) {
                stateObj[name] = "Обязательное поле";
            } else {
                stateObj[name] = 'OK'
            }
            break;
   
          case "password":
            if (!value) {
              stateObj[name] = "Обязательное поле";
            } else if (!passwordRegex.test(value)) {
              stateObj[name] = 'Пароль должен соответствовать требованиям'
            } else {
              stateObj[name] = 'OK'
            }
            break;

          case 'confPassword':
            if(!value) {
                stateObj[name] = "Пожалуйста, подтвердите пароль";
            } else if (value !== input.password) {
                stateObj['password'] = 'Пароли не совпадают'
            } else {
                stateObj[name] = 'OK'
                stateObj['password'] = 'OK'
            }
            break
   
          case "email":
            if (!value) {
              stateObj[name] = "Обязательное поле";
            } else if (!emailRegex.test(value)) {
              stateObj[name] = "Пожалуйста, введите корректный email";
            } else {
                Auth.emailVerify(value, setMsg)
                stateObj[name] = mes
            }
            break;

          case "tel":
            if (!value) {
                stateObj[name] = "Обязательное поле";
            } else {
                stateObj[name] = 'OK'
            }
            break;
   
          default:
            break;
        }

        return stateObj;
      });

    }
      
    function changeLogin(e) {
      e.preventDefault()
      console.log(error)

      if (error.first_name == 'OK' && error.email == 'OK' && error.password == 'OK' && error.tel == 'OK' && error.last_name == 'OK' && error.confPassword == 'OK') {
        Auth.registration(input, setMsg)
        document.getElementById('login_loader').classList.add('active')
      } else {
        setError({
          email: "Обязательное поле",
          first_name: "Обязательное поле",
          last_name: "Обязательное поле",
          password: "Обязательное поле",
          confPassword: "Обязательное поле",
          tel: "Обязательное поле",
        })
      }
    }

    return (
        <div className='register_block' onSubmit={changeLogin}>
            <form action="">
                <label htmlFor="" className="form_label">Имя</label>
                <input type="text" name="first_name" className={`form_input ${error.first_name && error.first_name != 'OK' ? 'error_input': ''}`} value={input.first_name} placeholder='Введите имя' onBlur={(e) => validateInput(e.target)} onChange={(e) => onInputChange(e.target)}/>
                {error.first_name && error.first_name != 'OK' ? <p className='error'>{error.first_name}</p>: <></>}

                <label htmlFor="" className="form_label">Фамилия</label>
                <input type="text" name="last_name" className={`form_input ${error.last_name && error.last_name != 'OK' ? 'error_input': ''}`} value={input.last_name} placeholder='Введите фамилию' onBlur={(e) => validateInput(e.target)} onChange={(e) => onInputChange(e.target)}/>
                {error.last_name && error.last_name != 'OK' ? <p className='error'>{error.last_name}</p>: <></>}

                <label htmlFor="" className="form_label">Email</label>
                <input type="text" name='email' className={`form_input ${error.email && error.email != 'OK' ? 'error_input': ''}`} value={input.email} placeholder='Введите email' onBlur={(e) => validateInput(e.target)} onChange={(e) => onInputChange(e.target)}/>
                {error.email && error.email != 'OK' ? <p className='error'>{error.email}</p>: <></>}

                <label htmlFor="" className="form_label">Пароль</label>
                <input type="password" name="password" className={`form_input ${error.password && error.password != 'OK' ? 'error_input': ''}`}value={input.password} placeholder='Придумайте пароль' onBlur={(e) => validateInput(e.target)} onChange={(e) => onInputChange(e.target)}/>
                {error.password && error.password != 'OK' ? <p className='error'>{error.password}</p> : <></>}

                <label htmlFor="" className="form_label">Подтверждение пароля</label>
                <input type="password" name="confPassword" className={`form_input ${error.confPassword && error.confPassword != 'OK' ? 'error_input': ''}`} value={input.confPassword} placeholder='Подтвердите пароль' onBlur={(e) => validateInput(e.target)} onChange={(e) => onInputChange(e.target)}/>
                {error.confPassword && error.confPassword != 'OK' ? <p className='error'>{error.confPassword}</p> : <></>}

                <label htmlFor="" className="form_label">Телефон</label>
                <input type="tel" name="tel" className={`form_input ${error.tel && error.tel != 'OK' ? 'error_input': ''}`} value={input.tel} placeholder='Введите номер телефона' onBlur={(e) => validateInput(e.target)} onChange={(e) => onInputChange(e.target)}/>
                {error.email && error.tel != 'OK' ? <p className='error'>{error.tel}</p>: <></>}

                <button className='regBtn main_button' type="submit">
                  Зарегистрироваться
                  <svg id="login_loader">
                    <circle className="circle_login" cx={'50%'} cy={'50%'} r={'8px'}></circle>
                  </svg>
                </button>
            </form>
        </div>
    );
}