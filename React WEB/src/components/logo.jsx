import React from 'react';
import style from './SCSS/logo.module.css';
const Logo = () => {
    return (
        <div className={style.logo_text}>
            <img className="logo_uerj" src="/Public/Imagens/Logo(Uerj).png" alt="Este é o logo UERJ" />
            <h2 className={style.text_1}>Seja Bem vindo! Faça seu login para ter acesso às caronas</h2>
        </div>
    );
}

export default Logo;