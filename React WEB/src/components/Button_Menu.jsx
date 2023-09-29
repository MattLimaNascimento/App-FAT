import React from 'react';
import Button_p from './button';
import '../pages/Logado/sass/Button_menu.scss'

const Button_Menu = ({ FuncRegister }) => {
    const handleClick = () => {
        FuncRegister(true);
    }

    return (
        <div className="container-car-register">
            <Button_p action={handleClick} ID={"Caroneiro"} nome={"Car_register"}>
                <a className="Caroneiro">
                    Quero Ser Caroneiro!
                </a>
            </Button_p>
        </div>
    );
}

export default Button_Menu;