import React, { useState } from 'react';
import '../pages/Logado/sass/menus.scss';

const Menus = () => {
    const [Change, setChange] = useState('Home');
    const items = [
        { id: 'tela1_cel' }
    ]
    const indicator = document.querySelector('.nav-indicator');
    const itens = document.querySelectorAll('.nav-item');

    function handleIndicator(el) {
        itens.forEach(item => {
            item.classList.remove('is-active');
            item.removeAttribute('style');
        });

        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        indicator.style.backgroundColor = el.getAttribute('active-color');

        el.classList.add('is-active');
        el.style.color = el.getAttribute('active-color');
    }


    itens.forEach((item) => {
        item.addEventListener('click', (e) => { handleIndicator(e.target) });
        item.classList.contains('is-active') && handleIndicator(item);
    });
    return (
        <div className="menus">
            <nav className="nav">
                <a onClick={() => setChange('Home')} className={`nav-item ${Change == 'Home' ? 'is-active' : ''}`} id="tela1_cel" active-color="#1976D2">Home</a>
                <a onClick={() => setChange('Motoristas')} className={`nav-item ${Change == 'Motoristas' ? 'is-active' : ''}`} id="tela2_cel" active-color="#2196F3">Motoristas</a>
                <span className="nav-indicator"></span>
            </nav>
        </div>
    );
}

export default Menus;