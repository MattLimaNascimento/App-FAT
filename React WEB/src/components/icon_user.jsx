import React, { useState } from 'react';
// import image from '../../Public/Imagens/profile-pic.png';
import style from './SCSS/User_img.module.css';
import { useNavigate } from 'react-router-dom';

const User_Imag = ({ Image, Nome, Email }) => {
    const [activeUserInfos, setactiveUserInfos] = useState(false);
    const history = useNavigate();
    const userStyle = {
        visibility: activeUserInfos ? 'visible' : 'hidden',
        opacity: activeUserInfos ? 1 : 0
    }
    const infos = [
        { id: "Caronas_confirmadas", className1: "fa-solid fa-user-check", a: 'Caronas Confirmadas', className2: 'sinal2', id2: 'sinal2' },
        { id: "Carona_ok", className1: "fa fa-car-side", a: 'Carona Marcada', className2: 'sinal', id2: 'sinal' },
        { id: "logout-btn", className1: "fa-solid fa-right-from-bracket", a: 'Sair', className2: '', id2: '' },
    ]
    const Logout = () => {
        const shouldLogout = window.confirm("Tem certeza de que deseja sair?");
    
        if (shouldLogout) {
            sessionStorage.clear();
            history('/');
        }
    }

    return (
        <div className="container">
            <div className={style.action_user}>
                <div onClick={() => setactiveUserInfos(!activeUserInfos)} className={style.profile_user} id="profile">
                    {Image ? <img src={Image} alt="profile-img" /> : null}
                </div>
                <div className={style.menu_user} style={userStyle}>
                    <h3>{Nome}<br /><span>{Email}</span></h3>
                    <ul>
                        {
                            infos.map((info, index) => (
                                info.id == 'logout-btn' ? (
                                    <li id={info.id} key={index} onClick={Logout}>
                                        <i className={info.className1}></i>
                                        <a href="#">{info.a}</a>
                                        <div className={info.className2} id={info.id2}></div>
                                    </li>
                                ) : (
                                    <li id={info.id} key={index}>
                                        <i className={info.className1}></i>
                                        <a href="#">{info.a}</a>
                                        <div className={info.className2} id={info.id2}></div>
                                    </li>
                                )
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default User_Imag;