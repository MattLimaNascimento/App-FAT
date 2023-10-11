import React from 'react';
import style from './SCSS/Modal.module.css';
import style2 from './SCSS/register_form.module.scss';
import { CgClose } from 'react-icons/cg';
import FormGeneric from './form';
const FormRegister_Generic = ({ Change, setRegister, Itson }) => {
    const handleClose = () => {
        setRegister(false);
    }
    const wrapperStyle = {
        transform: Itson? 'scale(1)':'scale(0)'
    }
    return (
        <div className={style.container_wrapper}>
            <div className={style.wrapper2} style={wrapperStyle}>
                <span className={style.icon_close} onClick={handleClose}><CgClose/></span>
                <div className={style2.form_box2}>
                    <h2>Registro</h2>
                    <FormGeneric ID={'myForm'}>
                        <div className={style2.input_box}>
                            <span className={style2.icon}><i className="fa fa-id-card"></i></span>
                            <input type="number" id="n_registro" name="n_registro" maxLength="11" pattern="\d{1,11}" required />
                            <label>Nº Registro (CNH)</label>
                        </div>
                        <div className={style2.input_box}>
                            <span className={style2.icon}><i className="fa fa-car"></i></span>
                            <input type="text" id="placa_carro" name="placa_carro"
                                // onInput="formatarPlaca('placa_carro')"
                                maxLength="8" required />
                            <label>Placa do Carro</label>
                        </div>
                        <div className={style2.remember_forgot}>
                            <label><input type="checkbox" />Eu aceito os termos & condições</label>
                        </div>
                        <button type="submit" id="Button_register" name="submit" className="btn">
                            <div className="message submitMessage">
                                <span id="Button-text" className="button-text">Registrar-se</span>
                            </div>
                        </button>
                        <div className={style2.login_register}>
                            <p>Já é motorista? <a onClick={() => (Change(true), document.getElementById('tela2').click())} className="login-link">Login</a></p>
                        </div>
                    </FormGeneric>
                </div>
            </div>
        </div>
    );
}

export default FormRegister_Generic;