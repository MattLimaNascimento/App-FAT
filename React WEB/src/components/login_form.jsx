import React, { useState } from 'react';
import FormGeneric from './form';
import { MdEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import Button_p from './button';
import style from './SCSS/login_form.module.css';

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
    const handleAddTaskClick = () => {
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
    const forgotPassword = () => {
        alert('Função esqueceu senha!');
    };

    return (
        <div style={loginStyle} className={style.form_box}>
            <h2>Login</h2>
            <FormGeneric act={'#'}>
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
                <Button_p action={handleAddTaskClick} nome={style.btn_1}>
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