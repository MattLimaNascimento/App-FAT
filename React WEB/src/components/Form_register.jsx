import React from 'react';
// import '../pages/Logado/sass/wrapper.scss';
import { CgClose } from 'react-icons/cg';
import FormGeneric from './form';
const FormRegister_Generic = ({ setRegister, Itson }) => {
    const handleClose = () => {
        setRegister(false);
    }
    return (
        <div className="container_wrapper">
            <div className={`wrapper ${Itson? 'active-popup':''}`}>
                <span className="icon-close" onClick={handleClose}><CgClose/></span>
                <div className="form-box register">
                    <h2>Registro</h2>
                    <FormGeneric ID={'myForm'}>
                        <div className="input-box">
                            <span className="icon"><i className="fa fa-id-card"></i></span>
                            <input type="number" id="n_registro" name="n_registro" maxLength="11" pattern="\d{1,11}" required />
                            <label>Nº Registro (CNH)</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className="fa fa-car"></i></span>
                            <input type="text" id="placa_carro" name="placa_carro"
                                // onInput="formatarPlaca('placa_carro')"
                                maxLength="8" required />
                            <label>Placa do Carro</label>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />Eu aceito os termos & condições</label>
                        </div>
                        <button type="submit" id="Button_register" name="submit" className="btn">
                            <div className="message submitMessage">
                                <span id="Button-text" className="button-text">Registrar-se</span>
                            </div>
                        </button>
                        <div className="login-register">
                            <p>Já possui uma conta? <a href="#" className="login-link">Login</a></p>
                        </div>
                    </FormGeneric>
                </div>
            </div>
        </div>
    );
}

export default FormRegister_Generic;