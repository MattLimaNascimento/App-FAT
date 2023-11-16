import React, { useState } from 'react';
import Days_menu from './Days_menu';
import Anuncios_Caronas from './Container_anuncios';
import style from './SCSS/Menu1.module.css'

const Menu1 = ({ tela }) => {
    const menu1Style = {
        transform: tela? 'translateX(-150%)':'translateX(0)'
    }
    return (
        <div className={style.menu1} style={menu1Style}>
            <header className={style.header}>
                <Days_menu />
            </header>
            <Anuncios_Caronas />
        </div>    

    );
}

export default Menu1;