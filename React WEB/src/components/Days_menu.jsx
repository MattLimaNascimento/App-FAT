import React, { useState } from 'react';
// import '../pages/Logado/sass/Days_menu.scss';

const Days_menu = () => {
    const [activeButton, setactiveButton] = useState(false);
    const itens = [
        { text: 'option1', dia: 'segunda', value: "Segunda" },
        { text: 'option1', dia: 'terca', value: "Terca" },
        { text: 'option1', dia: 'quarta', value: "Quarta" },
        { text: 'option1', dia: 'quinta', value: "Quinta" },
        { text: 'option1', dia: 'sexta', value: "Sexta" },
    ]
    
    return (
            <div className='day select'>
                <div className="select-box1" onClick={() => setactiveButton(!activeButton)}>
                    <div className={`options-container ${activeButton? 'active':''}`} id="options-container2">
                        {itens.map((item, index) => (
                            <div key={index} className={item.text} id={item.text}>
                                <input type="radio" className="radio" id={item.dia} value={item.value} name="category" />
                                <label htmlFor={item.dia}>{item.value}</label>
                            </div>
                        ))
                        }
                    </div>
                    <div className="selected1" id="selected2">
                        <h4>Selecione o Dia p/ Sua Carona!</h4>
                    </div>
                </div>
            </div>
    );
}

export default Days_menu;