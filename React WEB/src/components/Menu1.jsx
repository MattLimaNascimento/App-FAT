import React, { useState } from 'react';
import Days_menu from './Days_menu';
import Button_Menu from './Button_Menu';
import FormRegister_Generic from './Form_register';
import Anuncios_Caronas from './Container_anuncios';
import style from './SCSS/Menu1.module.css'

const Menu1 = ({ tela, Change }) => {
    const [RegisterTurn, setRegisterTurn] = useState(false);
    const menu1Style = {
        transform: tela? 'translateX(-150%)':'translateX(0)'
    }
    return (
        <div className={style.menu1} style={menu1Style}>
            <header className={style.header}>
                <Days_menu />
                <Button_Menu FuncRegister={setRegisterTurn} />
            </header>
            <FormRegister_Generic Change={Change} Itson={RegisterTurn} setRegister={setRegisterTurn} />
            <Anuncios_Caronas />
        </div>    

    );
}

export default Menu1;