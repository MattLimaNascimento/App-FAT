import React, { useState } from 'react';
import style from './SCSS/Modal.module.css';
import FormGeneric from './form';
import styles from './SCSS/login_form.module.css';
import { MdEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import Button_p from './button';
import styled from 'styled-components';

const SegurancaMenu = styled.div`
    .seguranca{
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: transform 1s ease, height .2s ease;
        overflow: hidden;
        opacity: 1;
        transform: ${prop => prop.tela ? 'translateY(0)' : 'translateY(-200%)'};
    }
`

const Seguranca = ({activateTela , Change}) => {
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
    // const loginStyle = {
    //     transition: 'transform 0.2s ease',
    //     transform: Login_act ? 'translateX(-800px)' : 'translateX(0)',
    // };
    const eyes = {
        opacity: pass ? 1 : 0,
        overflow: pass ? 'visible' : 'hidden',
    };
    const forgotPassword = () => {
        alert('Função esqueceu senha!');
    };

    return (
        <SegurancaMenu tela={activateTela}>
            <div className="seguranca">
                <div className={style.container_wrapper}>
                    <div className={style.wrapper3}>
                        <div className={styles.form_box}>
                            <h2>Login</h2>
                            <FormGeneric act={'#'}>
                                <div className={styles.input_box}>
                                    <span className={styles.icon}><MdEmail /></span>
                                    <input type="email" id="email_entrada" onChange={handleInputEmail} required />
                                    <label>Email</label>
                                </div>
                                <div className={styles.input_box}>
                                    <span className={styles.icon}>
                                        <div onClick={() => setpass(!pass)} className={styles.eyes}>
                                            <VscEyeClosed style={eyes} className='closed' />
                                            <VscEye className={styles.open} />
                                        </div>
                                        <BiSolidLockAlt />
                                    </span>
                                    <input type={pass ? "text" : "password"} id="senha_entrada" onChange={handleInputPassWord} required />
                                    <label>Senha</label>
                                </div>
                                <div className={styles.remember_forgot}>
                                    <label><input type="checkbox" id="checkbox" />Lembre-se de mim</label>
                                    <a href="#" onClick={forgotPassword}>Esqueceu sua Senha?</a>
                                </div>
                                <Button_p action={handleAddTaskClick} nome={styles.btn_1}>
                                    <div className="login-name">Login</div>
                                    {/* <div className="loading login">Loading</div> */}
                                </Button_p>
                                <div className={styles.login_register}>
                                    <p>Já possui uma conta? <a onClick={() => (Change(false), document.getElementById('tela1').click())} className="register-link">Registrar</a></p>
                                </div>
                            </FormGeneric>
                        </div>

                    </div>
                </div>
            </div>
        </SegurancaMenu>
        
    );
}

export default Seguranca;