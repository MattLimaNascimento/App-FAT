import React, { useState } from 'react';
import "../pages/home/sass/home.css";
import "../pages/home/sass/wrapper.scss";
import { CgClose } from 'react-icons/cg';
import Login_form from '../pages/home/login_form';
import RegisterForm from '../pages/home/register_form';

const Modal = ({ isOpen, SetModal, Log_func, Reg_func }) => {

    const [login_act, setlogin_act] = useState(false);
    const modal_turn = () => setlogin_act(!login_act);

    const modalStyle = {
        transform: isOpen ? 'scale(1)' : 'scale(0)',
        height: login_act ? '520px' : '440px',
    };


    return (
        <div className="wrapper" style={modalStyle}>
            <span className='icon-close' onClick={() => SetModal(false)}><CgClose /></span>
            <Login_form login_func={Log_func} Login_act={login_act} Register_page={modal_turn} />
            <RegisterForm login_Act={login_act} login_turn={modal_turn} Register_func={Reg_func} />
        </div>
    );
}

export default Modal;
