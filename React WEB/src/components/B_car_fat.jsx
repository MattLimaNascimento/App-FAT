import React from 'react';
import Button_p from './button';
import style from './SCSS/B_car_fat.module.css';

const B_car_fat = () => {
    const refresh = () => {
        window.location.reload();
    }

    return (
        <Button_p action={refresh} nome={style.Btn_refresh}>
            <h5 className={style.carona_fat}>Car-FAT</h5>
            <img src="/Public/Imagens/logo carrinho.png" alt="Logo Caronas FAT" className={style.logo_carrinho} />
        </Button_p>
    );
}

export default B_car_fat;