import React, { useState } from 'react';
import Header from '../../components/Header';
import B_car_fat from '../../components/B_car_fat';
import Menu_Princ from '../../components/Menu_princ';
import User_Imag from '../../components/icon_user';
import Menus from '../../components/Menus';
import Menu1 from '../../components/Menu1';
import Seguranca from '../../components/seguranca';

const Pag_principal = () => {
    const [ChangeSecurity, setChangeSecurity] = useState(false);

    return ( 
        <div className="conteudo">
            <Header >
                <B_car_fat />
                <Menus />
                <Menu_Princ tela={setChangeSecurity}/>
                <User_Imag />
            </Header>
            <main>
                <Menu1 Change={setChangeSecurity} tela={ChangeSecurity} />
                <Seguranca Change={setChangeSecurity} activateTela={ChangeSecurity}/>
            </main>
        </div>
    );
}

export default Pag_principal;