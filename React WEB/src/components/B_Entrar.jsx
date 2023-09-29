import React from 'react';
import Button_p from './button';

const B_Entrar = ({ Pop_up }) => {
    return ( 
        <Button_p action={Pop_up} nome={'btn_login'}>
                <h5>
                    Entrar
                </h5>
            </Button_p>
    );
}

export default B_Entrar;