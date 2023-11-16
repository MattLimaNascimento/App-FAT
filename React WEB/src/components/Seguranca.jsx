import React, { useEffect, useState } from 'react';
import style from './SCSS/Modal.module.css';
import FormGeneric from './form';
import styles from './SCSS/login_form.module.css';
import { FaAddressCard } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import Button_p from './button';
import styled from 'styled-components';
import axios from 'axios';

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
const Menu2_Style = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: translateX(100%);
    transition: transform 1s ease;
`

const Menu2 = ({ activateTela, Change }) => {
    const [InputCNH, setInputCNH] = useState();
    const [InputPlaca_Carro, setInputPlaca_Carro] = useState();
    const [Changewindow, setChangewindow] = useState(false);

    const handleInputCNH = (e) => {
        setInputCNH(e.target.value);
    };
    const handleInputPlaca_Carro = (e) => {
        setInputPlaca_Carro(e.target.value);
    };
    const handleAddTaskClick = async (e) => {
        e.preventDefault();
        const data = {
            'cnh': InputCNH,
            'placa_carro': InputPlaca_Carro,
        }
        await axios.patch('http://127.0.0.1:8000/api/auth/users/me/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('auth_token')}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    sessionStorage.setItem('cnh', InputCNH);
                    sessionStorage.setItem('placa_carro', InputPlaca_Carro);
                }
            })
            .catch((err) => console.error(err));
    };

    const h1_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    const h2_style = {
        width: '300px',
        top: '5px',
        left: '55%'
    }

    useEffect(() => {
        const storedCNH = sessionStorage.getItem('cnh');
        const storedPlacaCarro = sessionStorage.getItem('placa_carro');

        if (storedCNH || storedPlacaCarro) {
            setInputCNH(storedCNH);
            setInputPlaca_Carro(storedPlacaCarro);
            setChangewindow(true);
        }
    }, []);

    return (

        <>
            {Changewindow ? (
                <h1 style={h1_style}>Hello, world!</h1>
            ) : (
                <SegurancaMenu tela={activateTela}>
                    <div className="seguranca">
                        <div className={style.container_wrapper}>
                            <div className={style.wrapper3}>
                                <div className={styles.form_box}>
                                    <h2 style={h2_style}>Seja um Motorista!</h2>
                                    <FormGeneric act={'#'}>
                                        <div className={styles.input_box}>
                                            <span className={styles.icon}><FaAddressCard /></span>
                                            <input type="number" id="email_entrada" onChange={handleInputCNH} required />
                                            <label>N° Registro (CNH)</label>
                                        </div>
                                        <div className={styles.input_box}>
                                            <span className={styles.icon}>
                                                <FaCarSide />
                                            </span>
                                            <input type="text" id="senha_entrada" onChange={handleInputPlaca_Carro} required />
                                            <label>Placa do Carro</label>
                                        </div>
                                        <Button_p action={handleAddTaskClick} nome={styles.btn_1}>
                                            <div className="login-name">Cadastrar</div>
                                            {/* <div className="loading login">Loading</div> */}
                                        </Button_p>
                                        <div className={styles.login_register}>
                                            <p>Ainda não possui uma conta? <a onClick={() => (Change(false), document.getElementById('tela1').click(), document.getElementById('Caroneiro').click())} className="register-link">Registrar</a></p>
                                        </div>
                                    </FormGeneric>
                                </div>

                            </div>
                        </div>
                    </div>
                </SegurancaMenu>
            )}
        </>

    );
}

export default Menu2;