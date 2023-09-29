import React from 'react';
import Header from '../../components/Header';
import B_car_fat from '../../components/B_car_fat';
import Menu_Princ from '../../components/Menu_princ';
import User_Imag from '../../components/icon_user';
import Menus from '../../components/Menus';

const Header_P = () => {

    return (
        <Header>
            <B_car_fat />
            <Menus/>
            <Menu_Princ />
            <User_Imag />
        </Header>
    );
}

export default Header_P;