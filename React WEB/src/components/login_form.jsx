import React, { useState } from 'react';
import FormGeneric from './form';
import { MdEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import Button_p from './button';
import style from './SCSS/login_form.module.css';
import axios from 'axios';

const Login_form = ({ login_func, Login_act, Register_page }) => {
    const [pass, setpass] = useState(false);
    const [InputEmail, setInputEmail] = useState();
    const [InputPassWord, setInputPassWord] = useState();
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };
    const handleInputPassWord = (e) => {
        setInputPassWord(e.target.value);
    };
    const handleAddTaskClick = (e) => {
        e.preventDefault();
        login_func(InputEmail, InputPassWord);
    };
    const loginStyle = {
        transition: 'transform 0.2s ease',
        transform: Login_act ? 'translateX(-800px)' : 'translateX(0)',
    };
    const eyes = {
        opacity: pass ? 1 : 0,
        overflow: pass ? 'visible' : 'hidden',
    };
    const forgotPassword = async () => {
        if (!InputEmail) {
            alert('Por favor, insira seu email para recuperação de senha!')
            return
        }
        const infos = {
            'email': InputEmail
        }
        await axios.post('http://127.0.0.1:8000/api/auth/users/reset_password/', infos, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status) {
                alert('Email de solicitação de troca de senha enviado com sucesso para o seu email!');
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div style={loginStyle} className={style.form_box}>
            <h2>Login</h2>
            <FormGeneric onsubmit={handleAddTaskClick} act={'#'}>
                <div className={style.input_box}>
                    <span className={style.icon}><MdEmail /></span>
                    <input type="email" id="email_entrada" onChange={handleInputEmail} required />
                    <label>Email</label>
                </div>
                <div className={style.input_box}>
                    <span className={style.icon}>
                        <div onClick={() => setpass(!pass)} className={style.eyes}>
                            <VscEyeClosed style={eyes} className='closed' />
                            <VscEye className={style.open} />
                        </div>
                        <BiSolidLockAlt />
                    </span>
                    <input type={pass ? "text" : "password"} id="senha_entrada" onChange={handleInputPassWord} required />
                    <label>Senha</label>
                </div>
                <div className={style.remember_forgot}>
                    <label><input type="checkbox" id="checkbox" />Lembre-se de mim</label>
                    <a href="#" onClick={forgotPassword}>Esqueceu sua Senha?</a>
                </div>
                <Button_p Type={'submit'} nome={style.btn_1}>
                    <div className="login-name">Login</div>
                    {/* <div className="loading login">Loading</div> */}
                </Button_p>
                <div className={style.login_register}>
                    <p>Já possui uma conta? <a onClick={Register_page} className="register-link">Registrar</a></p>
                </div>
            </FormGeneric>
        </div>
    );
}

export default Login_form;