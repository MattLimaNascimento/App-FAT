import React from 'react';
import Button_p from './button';

const B_car_fat = () => {
    const refresh = () => {
        window.location.reload();
    }

    return (
        <Button_p action={refresh} nome={'Btn_refresh'}>
            <h5 className="carona_fat">Car-FAT</h5>
            <img src="/Public/Imagens/logo carrinho.png" alt="Logo Caronas FAT" className="logo_carrinho" />
        </Button_p>
    );
}

export default B_car_fat;