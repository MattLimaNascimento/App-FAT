import React, { useState } from 'react';
import styled from 'styled-components';

const DaysSelect = styled.div`
    position: absolute;
    top: -20px;
    padding-left: 100px;
    .select-box{
        position: absolute;
        display: flex;
        justify-content: center;
        width: 290px;
        flex-direction: column;
        z-index: 2;
        .options-container {
            display: flex;
            flex-direction: column;
            background: black;
            color: #f5f6fa;
            width: 50%;
            border-radius: 8px;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            order: 1;
            transition: all .4s;
            &.active {
                max-height: 240px;
                opacity: 1;
                overflow-y: scroll;
                &+.selected1::after {
                    transform: rotateX(180deg);
                }
            }
            &::-webkit-scrollbar {
                width: 8px;
                background: black;
                border-radius: 0 8px 8px 0;
            }
            &::-webkit-scrollbar-thumb {
                background: #fff;
                border-radius: 0 8px 8px 0;
            }
            .option1 {
                &:hover {
                    background: #414b57;
                }
                .radio {
                    display: none;
                }
            }
        }
        .selected1 {
            display: flex;
            top: 3px;
            padding-left: 10px;
            background: #2196F3;
            width: 100%;
            border-radius: 7px;
            margin-bottom: 8px;
            color: #f5f6fa;
            position: relative;
            transition: .5s;
            order: 0;
            &:hover {
                background-color: #1976D2;
            }
            &::after {
                content: "";
                background: url('../../../Public/Imagens/down-arrow2-svgrepo-com (1).svg');
                background-size: contain;
                position: absolute;
                font-size: 30px;
                height: 35px;
                top: 5px;
                width: 35px;
                right: 5px;
                transition: all .4s;
            }
        }
        .options-container .option1,
        .selected1 {
            padding: 12px 24px;
            cursor: pointer;
        }
        label {
            cursor: pointer;
        }
    }
`

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
        <DaysSelect>
            <div className='select-box' onClick={() => (setactiveButton(!activeButton),console.log(activeButton))}>
                <div className={`options-container ${activeButton? 'active':''}`} id="options-container2">
                    {
                        itens.map((item, index) => (
                        <div key={index} className={item.text} id={item.text}>
                            <input type="radio" className='radio' id={item.dia} value={item.value} name="category" />
                            <label htmlFor={item.dia}>{item.value}</label>
                        </div>
                        ))
                    }
                </div>
                <div className='selected1' id="selected2">
                    <h4>Selecione o Dia p/ Sua Carona!</h4>
                </div>
            </div>
        </DaysSelect>
    );
}

export default Days_menu;