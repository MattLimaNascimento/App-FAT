import React from 'react';
import Button_p from './button';
import style from './SCSS/Button_menu.module.scss'

const Button_Menu = ({ FuncRegister }) => {
    const handleClick = () => {
        FuncRegister(true);
    }

    return (
        <div className={style.container_car_register}>
            <Button_p action={handleClick} ID={"Caroneiro"} nome={style.Car_register}>
                <a className="Caroneiro">
                    Quero Ser Caroneiro!
                </a>
            </Button_p>
        </div>
    );
}

export default Button_Menu;