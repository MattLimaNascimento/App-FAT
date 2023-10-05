import React from 'react';
import Button_p from './button';
import style from './SCSS/B_Entrar.module.css'
const B_Entrar = ({ Pop_up }) => {
    return ( 
        <Button_p action={Pop_up} nome={style.btn_login}>
                <h5>
                    Entrar
                </h5>
            </Button_p>
    );
}

export default B_Entrar;