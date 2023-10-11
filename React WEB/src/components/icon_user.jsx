import React, { useState } from 'react';
import image from '../../Public/Imagens/profile-pic.png';
import style from './SCSS/User_img.module.css';

const User_Imag = () => {
    const [activeUserInfos, setactiveUserInfos] = useState(false);
    const userStyle = {
        visibility: activeUserInfos? 'visible':'hidden',
        opacity: activeUserInfos? 1:0
    }
    const infos = [
        { id: "Caronas_confirmadas", className1: "fa-solid fa-user-check", a: 'Caronas Confirmadas', className2: 'sinal2', id2: 'sinal2' },
        {id:"Carona_ok", className1:"fa fa-car-side", a: 'Carona Marcada', className2: 'sinal', id2: 'sinal' },
    ]
    return (
        <div className="container">
            <div className={style.action_user}>
                <div onClick={() => setactiveUserInfos(!activeUserInfos)} className={style.profile_user} id="profile">
                    <img src={image} alt="profile-img" />
                </div>
                <div className={style.menu_user} style={userStyle}>
                    <h3>Matheus<br /><span>matheus.manasses.30@gmail.com</span></h3>
                    <ul>
                        <li id="Caronas-confirmadas">
                            <i className="fa-solid fa-user-check"></i>
                            <a href="#">Caronas Confirmadas</a>
                            <div className="sinal2" id="sinal2"></div>
                        </li>
                        <li id="Carona_ok">
                            <i className="fa fa-car-side"></i>
                            <a href="#" id="Vaga_registrada">Carona Marcada</a>
                            <div className="sinal" id="sinal"></div>
                        </li>
                        <li id="logout-btn">
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <a href="#">Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default User_Imag;