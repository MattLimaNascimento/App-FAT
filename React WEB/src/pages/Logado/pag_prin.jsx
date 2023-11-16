import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import B_car_fat from '../../components/B_car_fat';
import Menu_Princ from '../../components/Menu_princ';
import User_Imag from '../../components/icon_user';
import Menus from '../../components/Menus';
import Menu1 from '../../components/Menu1';
import Menu2 from '../../components/seguranca';
import { useNavigate } from 'react-router-dom';


const Pag_principal = () => {
    const [ChangeSecurity, setChangeSecurity] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        if (sessionStorage.length === 0) {
            history('/'); // Substitua pelo caminho real da sua tela de logado
        }
    }, []);

    const UserData = {};

    for (let i = 0; i < sessionStorage.length; i++) {
        const chave = sessionStorage.key(i);
        const valor = sessionStorage.getItem(chave);
        UserData[chave] = valor;
    }
    return (
        <div className="conteudo">
            <Header >
                <B_car_fat />
                <Menus />
                <Menu_Princ tela={setChangeSecurity} />
                <User_Imag Image={UserData.diretorio} Nome={UserData.name} Email={UserData.email}/>
            </Header>
            <main>
                <Menu1 Change={setChangeSecurity} tela={ChangeSecurity} />
                <Menu2 Change={setChangeSecurity} activateTela={ChangeSecurity} />
            </main>
        </div>
    );
}

export default Pag_principal;