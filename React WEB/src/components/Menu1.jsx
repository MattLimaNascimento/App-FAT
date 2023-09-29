import React, { useState } from 'react';
import Days_menu from './Days_menu';
import Button_Menu from './Button_Menu';
import '../pages/home/sass/wrapper.scss';
import FormRegister_Generic from './Form_register';
import Anuncios_Caronas from './Container_anuncios';
import '../pages/Logado/sass/Menu1.scss'

const Menu1 = () => {
    const [RegisterTurn, setRegisterTurn] = useState(false);

    return (
        <>
            <Days_menu />
            <Button_Menu FuncRegister={setRegisterTurn} />
            <FormRegister_Generic Itson={RegisterTurn} setRegister={setRegisterTurn} />
            <Anuncios_Caronas />
        </>    

    );
}

export default Menu1;