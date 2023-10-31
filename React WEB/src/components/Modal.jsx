import React, { useState } from 'react';
import style from './SCSS/Modal.module.css';
import { CgClose } from 'react-icons/cg';
import Login_form from './login_form';
import RegisterForm from './register_form';

const Modal = ({ isOpen, SetModal, Log_func, Reg_func }) => {

    const [login_act, setlogin_act] = useState(false);
    const modal_turn = () => setlogin_act(!login_act);

    const modalStyle = {
        transform: isOpen ? 'scale(1)' : 'scale(0)',
        height: login_act ? '600px' : '440px',
    };


    return (
        <div className={style.container_wrapper}>
            <div className={style.wrapper} style={modalStyle}>
                <span className={style.icon_close} onClick={() => SetModal(false)}><CgClose /></span>
                <Login_form login_func={Log_func} Login_act={login_act} Register_page={modal_turn} />
                <RegisterForm login_Act={login_act} login_turn={modal_turn} Register_func={Reg_func} />
            </div>
        </div>
    );
}

export default Modal;
