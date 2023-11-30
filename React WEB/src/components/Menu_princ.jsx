import React, { useEffect, useState } from 'react';
import './SCSS/Menu_princ.css';

const Menu_Princ = ({ tela, ButtonClick }) => {
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {
        const button = document.getElementById('tela1');
        const text = button.querySelector(".menu__text");
        setLineWidth(text, button);
    })

    const handleTabClick = (index, id) => {
        id == 'tela2' ? tela(true): tela(false);
        const text = document.getElementById(id).querySelector(".menu__text");
        setLineWidth(text, document.getElementById(id));
        setActiveTab(index);
        ButtonClick(true);
    };
    
    const setLineWidth = (text, item) => {
        const lineWidth = text.offsetWidth + "px";
        item.style.setProperty("--lineWidth", lineWidth);
    };

    const tabItems = [
        {
            icon: (
                <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 179.1 145">

                    <g id="home-anm">
                        <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            d="M70.5,80.1h40.7" />
                        <path d=
                            "M35,64v80" />
                        <path
                            d="M145.1,143V63" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M24.9,70l65.7-50.7L156.3,70" />
                    </g>

                    <path
                        strokeLinejoin="round"
                        d="M145.1,117.6v33.1c0,1.5-1.2,2.8-2.8,2.8h-28.4c-1.5,0-2.8-1.2-2.8-2.8V126c0-11.3-9.2-20.5-20.5-20.5l0,0
                    c-11.3,0-20.5,9.2-20.5,20.5v27.5h16H37.8c-1.5,0-2.8-1.2-2.8-2.8v-34.2" />
                </svg>
            ),
            text: 'Caronas',
            id: 'tela1'
        },
        {
            icon: (
                <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 179.1 145">

                    <g
                        id="strategy-anm">
                        <path
                            d="M84.1,50.4L72,64.7c-2,2.4-5.2,3.5-8.3,3l-40.1-6.8c-3.2-0.6-5.8,2.4-4.8,5.5L42,127.9c1.2,3.6,4.6,6.1,8.4,6.1
                            h81.6c3.9,0,7.3-2.6,8.5-6.3l21.5-61.4c0.9-3-1.7-6-4.9-5.4l-38.3,6.7c-3,0.6-6.2-0.5-8.2-2.8L97.4,50.2
                            C93.8,46.3,87.6,46.3,84.1,50.4z" />
                    </g>
                    <path
                        strokeLinecap="round"
                        d="M38.8,153.5h105.5" />
                    <path
                        strokeLinecap="round"
                        d="M66.8,112.5h49.5" />
                    <path
                        id="strategy-cir1"
                        strokeWidth={0}
                        fill="currentColor"

                        d="M32.4,37.5c0,5.8-4.7,10.5-10.5,10.5s-10.5-4.7-10.5-10.5S16.1,27,21.9,27S32.4,31.7,32.4,37.5z" />
                    <path
                        id="strategy-cir2"
                        strokeWidth={0}
                        fill="currentColor"

                        d="M102.3,23.5c0,5.8-4.7,10.5-10.5,10.5s-10.5-4.7-10.5-10.5S86,13,91.8,13S102.3,17.7,102.3,23.5z" />
                    <path
                        id="strategy-cir3"
                        strokeWidth={0}
                        fill="currentColor"

                        d="M169.6,37.5c0,5.8-4.7,10.5-10.5,10.5s-10.5-4.7-10.5-10.5S153.3,27,159.1,27S169.6,31.7,169.6,37.5z" />

                </svg>
            ),
            text: 'Motoristas',
            id: 'tela2'
        },
    ];


    return (
        <menu className='menu'>
            {
                tabItems.map((item, index) => (
                    <button key={index} className={`menu__item ${activeTab == index ? 'active' : ''}`} id={item.id} onClick={() => handleTabClick(index, item.id)}>
                        <div className="menu__icon">{item.icon}</div>
                        <strong className={`menu__text ${activeTab === index ? 'active' : ''}`}>{item.text}</strong>
                    </button>
                ))}
        </menu>
    );
};

export default Menu_Princ;