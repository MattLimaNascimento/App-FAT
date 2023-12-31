import React, { useEffect, useState } from 'react';
import style from './SCSS/Modal.module.css';
import FormGeneric from './form';
import styles from './SCSS/login_form.module.css';
import { FaAddressCard } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import Button_p from './button';
import styled from 'styled-components';
import axios from 'axios';
import { CgClose } from 'react-icons/cg';

const SegurancaMenu = styled.div`
    .seguranca{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -50px;
        left: 0;
        height: 100%;
        width: 100%;
        transition: transform 1s ease, height .2s ease;
        transform: ${prop => (prop.tela ? 'translateY(0)' : 'translateY(-200%)')};
    }
    @media screen and (max-width: 870px) {
        .seguranca{
            width: 140px;
            left: 32%;
            top: -25%;
        }
    }
    @media screen and (min-width: 871px) and (max-width:1400px) {
        .seguranca {
            top: -18%;
        }
    }
`
const Menu2_Style = styled.div`
    transform: ${prop => prop.tela ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -90px;
    left: 0;
    height: 100%;
    width: 100%;
    @media screen and (max-width: 870px) {
        left: 50px;
        top: -10px;
    }
`;

const Container_Style = styled.div`
    position: absolute;
    top: 55%;
    left: 30%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 600px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    overflow: hidden;
    transition: transform .5s ease, height .2s ease;
    z-index: 3;

.form-box {
    width: 100%;
    padding: 20px;
    &.anuncio-caronas {
        position: absolute;
        transition: none;
    }
    h2 {
        font-size: 2em;
        color: black;
        text-align: center;
    }
}
.input-box {
    position: relative;
    width: 50%;
    height: 50px;
    border-bottom: 2px solid black;
    margin: 30px 0;
    label {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        font-size: 1em;
        color: black;
        font-weight: 500;
        pointer-events: none;
        transition: .5s;
    }
    input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1em;
        color: black;
        font-weight: 600;
        padding: 0 35px 0 5px;
    }
    .icon {
        position: absolute;
        right: -20px;
        font-size: 1.2em;
        color: black;
        line-height: 50px;
    }
}
input:focus~label,
.input-box input:valid~label {
    top: -5px;
}
.container_menu2 {
    position: absolute;
    margin-top: 1em;
}
.container.left {
    position: absolute;
    width: 100%;
    margin-top: 3em;
    z-index: 1;
}
.select-box {
    position: absolute;
    display: flex;
    width: 400px;
    flex-direction: column;
    z-index: 2;
}
.select-box .options-container {
    background: #2f3640;
    color: #f5f6fa;
    max-height: 0;
    width: 30%;
    opacity: 0;
    transition: all .4s;
    border-radius: 8px;
    overflow: hidden;
    order: 1;
}
.form-box.anuncio-caronas h4 {
    letter-spacing: -.4px;
}
.selected {
    background: black;
    width: 48%;
    border-radius: 7px;
    margin-bottom: 8px;
    color: #f5f6fa;
    position: relative;
    transition: .5s;
    order: 0;
}
.selected:hover {
    background-color: #2196F3;
}
.selected::after {
    content: "";
    background: url("/Public/Imagens/down-arrow2-svgrepo-com\ \(1\).svg");
    background-size: contain;
    position: absolute;
    height: 100%;
    width: 32px;
    right: 10px;
    top: 5px;
    transition: all .4s;
}
.select-box .options-container.active {
    max-height: 240px;
    opacity: 1;
    overflow-y: scroll;
}
.select-box .options-container.active+.selected::after {
    transform: rotateX(180deg);
    top: -6px;
}
.select-box .options-container::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    border-radius: 0 8px 8px 0;
}
.select-box .options-container::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 0 8px 8px 0;
}
.select-box .option,
.selected {
    padding: 12px 24px;
    cursor: pointer;
}

.select-box .option:hover {
    background: #414b57;
}

.select-box label {
    cursor: pointer;
}

.select-box .option .radio {
    display: none;
}

.container.right {
    position: absolute;
    margin-top: 5em;
    left: 65%;
    padding: 10px;
    width: 120px;
    display: flex;
    flex-direction: column;
    z-index: 1;
}

.times {
    display: flex;
    flex-direction: column;
    gap: 20px;
    label {
        font-size: medium;
        letter-spacing: 2px;
        right: 20px;
    }
}

.form-box.form-box.anuncio-caronas button {
    top: 35.5em;
    position: absolute;
    width: 91.5%;
    height: 45px;
    background: black;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    transition: .5s;
    font-family: 'Roboto', Arial;
    font-size: 14px;
    overflow: hidden;
    z-index: 1;
}

.form-box.form-box.anuncio-caronas button:hover {
    background: #1976D2;
}

.fixo.mark {
    position: absolute;
    top: 28em;
}

.fixo.mark .explicacao {
    font-size: 14px;
    visibility: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 3;
}

.fixo.mark:hover .explicacao {
    opacity: 1;
    visibility: visible;
}
@media screen and (max-width: 464px) {
    top: 36%;
    left: 37%;
    width: 90%;
    .container.right {
        top: 350px;
        width: 100%;
        left: 40px;
    }
    .container.left {
        width: 180%;
    }
}
@media screen and (min-width: 465px) and (max-width: 870px) {
    top: 36%;
    left: 43%;
    width: 90%;
    
    .container.right {
        top: 350px;
        width: 100%;
        left: 40px;
    }
    .container.left {
        width: 180%;
    }

    .container_menu2 {
        left: 30%;
    }
}
@media screen and (min-width: 871px) and (max-width: 1000px) {
    top: 35%;
    left: 50%;
    width: 90%;
}
`
const Input = styled.input`
    text-align: center;
    border-radius: 20px;
    border: none;
    color: black;
    width: 120px;
    font-size: 20px;
`
const Tituto = styled.h3`
    position: absolute;
    top: 23%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    font-size: x-large;
    @media screen and (max-width: 870px) {
        top: 15%;
        left: 45%;
    }
    @media screen and (min-width: 871px) and (max-width: 1000px) {
        top: 14%;
        left: 50%;
    }
`
const Caronas = styled.div`
    position: absolute;
    top: 60%;
    left: 70%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    width: 700px;
    height: 800px;
    background-color: #fff;
    padding: 20px;
    overflow-y: auto; /* Adicione barra de rolagem quando necessário */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 260px;
    h1 {
        position: absolute;
        top: 25px;
    }
    /* Estilizando a barra de rolagem */
    scrollbar-color: #2196F3 #efefef; /* Firefox */
    scrollbar-width: thin; /* Firefox */
    &::-webkit-scrollbar {
        width: 12px; /* Largura da barra de rolagem */
    }
    &::-webkit-scrollbar-thumb {
        background-color: #2196F3; /* Cor do "pulgar" (a parte que você arrasta) */
        border-radius: 6px; /* Borda do "pulgar" */
    }
    &::-webkit-scrollbar-track {
        background-color: #efefef; /* Cor do fundo da barra de rolagem */
    }

    .card {
        width: 300px;
        height: 450px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        border-radius: 25px;
        background-color: #efefef;
    }

    .image-content,
    .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 14px;
    }

    .image-content {
        position: relative;
        row-gap: 5px;
        padding: 25px 0;
    }

    .overlay {
        border: none;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: #2196F3;
        border-radius: 25px 25px 0 25px;

        &::before,&::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: -40px;
            height: 40px;
            width: 40px;
            background-color: #2196F3;
            border-color: #efefef;
        }
        &::after {
            border-radius: 0 25px 0 0;
            background-color: #efefef;
        }
    }

    .card-image {
        position: relative;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        background: #FFF;
        padding: 3px;
        .card-img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #2196F3;
        }
    }

    .name {
        font-size: 25px;
        font-weight: 600;
        color: black;
    }

    .description {
        font-size: 18px;
        color: #707070;
        text-align: center;
        z-index: 999;
    }

    .button {
        border: none;
        font-size: 16px;
        color: #FFF;
        padding: 8px 16px;
        background-color: #2196F3;
        border-radius: 6px;
        margin: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
            background: #265DF2;
        }
    }
    @media screen and (max-width: 464px) {
        top: 75%;
        left: 37%;
        width: 90%;
    }
    @media screen and (min-width: 465px) and (max-width: 870px) {
        top: 75%;
        left: 43%;
        width: 90%;
    }
    @media screen and (min-width: 871px) and (max-width: 1000px) {
        top: 75%;
        left: 50%;
        width: 90%;
    }
    @media screen and (min-width: 1000px) and (max-width: 1520px) {
        left: 80%;
        width: 35%;
    }
`
const Container_Cards = styled.div`
    gap: 40px; /* Adicione barra de rolagem quando necessário */
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%);

    @media screen and (max-width: 399px) {
        left: 15px;
    }
    @media screen and (min-width: 400) and (max-width: 870px) {
        left: 30px;
    }
`
const Container_buttons = styled.div`
    display: flex;
    flex-direction: row;
`
const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) ${prop => prop.tela ? 'scale(1)' : 'scale(0)'};
    width: 600px;
    height: 400px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    overflow: hidden;
    transition: transform .5s ease, height .2s ease;
    z-index: 3;
    .input-box {
    position: relative;
    width: 50%;
    height: 50px;
    border-bottom: 2px solid black;
    margin: 30px 0;
        label {
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            font-size: 1em;
            color: black;
            font-weight: 500;
            pointer-events: none;
            transition: .5s;
        }
        input {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1em;
            color: black;
            font-weight: 600;
            padding: 0 35px 0 5px;
        }
        .icon {
            position: absolute;
            right: -20px;
            font-size: 1.2em;
            color: black;
            line-height: 50px;
        }
    }
    input:focus~label,
    .input-box input:valid~label {
        top: -5px;
    }
    button {
    top: 80%;
    position: absolute;
    width: 90%;
    height: 50px;
    left: 50%;
    transform: translate(-50%,-50%);
    background: black;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    transition: .5s;
    font-family: 'Roboto', Arial;
    font-size: 14px;
    overflow: hidden;
    z-index: 1;
    &:hover {
        background: #1976D2;
    }
}
`
const Container_infos = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 400px;
    position: absolute;
    .direita {
        position: absolute;
        top: 170px;
        left: 60%;
        transform: translate(-50%,-50%);
        width: 300px;
    }
    .esquerda {
        position: absolute;
        top: 170px;
        left: 122%;
        transform: translate(-50%,-50%);
        width: 300px;
    }
`
const Time = styled.input`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 20px;
    border: none;
    color: black;
    width: 120px;
    font-size: 20px;
`
const Icon_close = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    background: black;
    font-size: 2em;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 20px;
    cursor: pointer;
    z-index: 1;
    transition: .5s;
    &:hover {
        background-color: #1976D2;
    }
`
const Menu2 = ({ activateTela, Change }) => {
    const [InputCNH, setInputCNH] = useState();
    const [InputPlaca_Carro, setInputPlaca_Carro] = useState();
    const [Changewindow, setChangewindow] = useState(false);
    const [changeCarMoto, setChangeCarMoto] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); // Estado para rastrear a opção selecionada
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [preco, setPreco] = useState(0);
    const [qtdAcentos, setQtdAcentos] = useState(0);
    const [timeSegunda, setTimeSegunda] = useState('00:00');
    const [selectedOption_Edit, setSelectedOption_Edit] = useState(''); // Estado para rastrear a opção selecionada
    const [origin_Edit, setOrigin_Edit] = useState('');
    const [destiny_Edit, setDestiny_Edit] = useState('');
    const [preco_Edit, setPreco_Edit] = useState(0);
    const [qtdAcentos_Edit, setQtdAcentos_Edit] = useState(0);
    const [timeSegunda_Edit, setTimeSegunda_Edit] = useState('00:00');
    const [caronas, setCaronas] = useState([]);
    const [modal, setmodal] = useState(false);
    const [ID, setID] = useState();

    const handleTimeChange = (day, value) => {
        switch (day) {
            case 'segunda':
                setTimeSegunda(value);
                break;

            default:
                break;
        }
    };

    const handleOriginChange = (e) => {
        setOrigin(e.target.value);
    };

    const handleDestinyChange = (e) => {
        setDestiny(e.target.value);
    };

    const handlePrecoChange = (e) => {
        // Certifique-se de que o valor seja sempre um número
        setPreco(parseInt(e.target.value, 10) || 0);
    };

    const handleQtdAcentosChange = (e) => {
        // Certifique-se de que o valor seja sempre um número
        setQtdAcentos(parseInt(e.target.value, 10) || 0);
    };
    const handleTimeChange_Edit = (day, value) => {
        switch (day) {
            case 'segunda':
                setTimeSegunda_Edit(value);
                break;

            default:
                break;
        }
    };

    const handleOriginChange_Edit = (e) => {
        setOrigin_Edit(e.target.value);
    };

    const handleDestinyChange_Edit = (e) => {
        setDestiny_Edit(e.target.value);
    };

    const handlePrecoChange_Edit = (e) => {
        // Certifique-se de que o valor seja sempre um número
        setPreco_Edit(parseInt(e.target.value, 10) || 0);
    };

    const handleQtdAcentosChange_Edit = (e) => {
        // Certifique-se de que o valor seja sempre um número
        setQtdAcentos_Edit(parseInt(e.target.value, 10) || 0);
    };

    const handleOptionClick = (value) => {
        setSelectedOption(value);
        setChangeCarMoto(false); // Fechar o container de opções após selecionar
    };

    const handleInputCNH = (e) => {
        let inputValue = e.target.value;
        // Limita o comprimento da placa a 11 caracteres
        inputValue = inputValue.slice(0, 11);

        setInputCNH(inputValue);
    };

    const handleInputPlaca_Carro = (e) => {
        // Obtém o valor digitado no input
        let inputValue = e.target.value;

        // Remove todos os caracteres não alfanuméricos
        inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

        // Garante que apenas letras maiúsculas sejam usadas
        inputValue = inputValue.toUpperCase();

        // Limita o comprimento da placa a 7 caracteres
        inputValue = inputValue.slice(0, 7);

        // Adiciona hífen após os primeiros três caracteres, se necessário
        if (inputValue.length > 3) {
            const primeiraParte = inputValue.slice(0, 3);
            const ultimosDigitos = inputValue.slice(3);

            // Garante que os últimos dígitos contenham apenas números ou uma letra na segunda posição
            const regexUltimosDigitos = /^[0-9]+|[A-Z][0-9]*$/;
            if (regexUltimosDigitos.test(ultimosDigitos.slice(1))) {
                inputValue = `${primeiraParte}-${ultimosDigitos}`;
            }
        }
        setInputPlaca_Carro(inputValue);
    };

    const handleAddTaskClick = async (e) => {
        e.preventDefault();
        const data = {
            'cnh': InputCNH,
            'placa_carro': InputPlaca_Carro,
        }
        await axios.patch('http://127.0.0.1:8000/api/auth/users/me/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('auth_token')}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    sessionStorage.setItem('cnh', InputCNH);
                    sessionStorage.setItem('placa_carro', InputPlaca_Carro);
                    alert('Parabéns! Agora você é um motorista!!!');
                    window.location.reload();
                }
            })
            .catch((err) => console.error(err));
    };

    const h2_style = {
        width: '300px',
        top: '5px',
        left: '55%'
    }

    const fetchCaronas = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/anuncios/rider-caronas/${sessionStorage.getItem('id')}/`);
            setCaronas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const storedCNH = sessionStorage.getItem('cnh');
        const storedPlacaCarro = sessionStorage.getItem('placa_carro');

        if (storedCNH || storedPlacaCarro) {
            setInputCNH(storedCNH);
            setInputPlaca_Carro(storedPlacaCarro);
            setChangewindow(true);
        }

        fetchCaronas();
    }, []);

    const Submit = async (e) => {
        e.preventDefault();
        if (timeSegunda == '00:00') {
            alert('Por favor insira o horário da sua carona!');
            return;
        }
        if (selectedOption == '') {
            alert('Por favor, selecione o tipo do veículo!');
            return;
        }
        const data = {
            'hora_saida': timeSegunda,
            'veiculo': selectedOption,
            'origem': origin,
            'destino': destiny,
            'preço': preco,
            'vagas': qtdAcentos,
            'motorista_id': sessionStorage.getItem('id')
        }
        axios.post('http://127.0.0.1:8000/anuncios/rides/', data, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(res => {
                if (res.status === 201) {
                    fetchCaronas();
                }
            })
            .catch(e => console.error(e));
    }

    const Delete = (Id) => {
        // Exibe um diálogo de confirmação
        const isConfirmed = window.confirm("Tem certeza que deseja deletar a carona?");

        const Delete_func = async () => {
            await axios.delete(`http://127.0.0.1:8000/anuncios/rides/${Id}/`)
                .then((res) => {
                    if (res.status == 204) {
                        fetchCaronas();
                    }
                })
        }
        // Se o usuário confirmar, realiza a ação de deleção
        if (isConfirmed) {
            Delete_func();
        }
    }

    const Submit_New = async (e) => {
        e.preventDefault();
        const data = {
            'hora_saida': timeSegunda_Edit,
            'vagas': qtdAcentos_Edit,
            'origem': origin_Edit,
            'destino': destiny_Edit,
            'preço': preco_Edit
        }

        await axios.patch(`http://127.0.0.1:8000/anuncios/rides/${ID}/`, data, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(res => { console.log(res); fetchCaronas(); setmodal(false) })
            .catch(err => console.error(err));

    }

    const Transfer_infos = (Dest, Orig, Price, Acent, Opt, Time) => {
        setDestiny_Edit(Dest);
        setOrigin_Edit(Orig);
        setPreco_Edit(Price);
        setQtdAcentos_Edit(Acent);
        setSelectedOption_Edit(Opt);
        setTimeSegunda_Edit(Time);
    }
    return (
        Changewindow ? (
            <Menu2_Style tela={activateTela} >
                <Tituto>
                    Bem vindo Uerjiano {sessionStorage.getItem('name')}!!!
                </Tituto>
                <Container_Style>
                    <div className="form-box anuncio-caronas">
                        <h2>Anuncie sua Carona!</h2>
                        <form action="#" onSubmit={Submit}>
                            <div className="container_menu2">
                                <div className="select-box" onClick={() => setChangeCarMoto(!changeCarMoto)}>
                                    <div className={`options-container ${changeCarMoto ? 'active' : ''}`} id="options-container">
                                        <div className="option" onClick={() => handleOptionClick('Carro')}>
                                            <input type="radio" className="radio" id="carro" value="carro" name="category" />
                                            <label htmlFor="carro">Carro</label>
                                        </div>
                                        <div className="option" onClick={() => handleOptionClick('Moto')}>
                                            <input type="radio" className="radio" id="moto" value="moto" name="category" />
                                            <label htmlFor="moto">Moto</label>
                                        </div>
                                    </div>
                                    <div className="selected" id="selected">
                                        <h4>{selectedOption ? `${selectedOption}` : 'Selecione o Veículo'}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="container left">
                                <div className="input-box">
                                    <span className="icon"><i className="fa fa-location-dot"></i></span>
                                    <input type="text" id="origin" name="origin" value={origin} onChange={handleOriginChange} required />
                                    <label>Origem</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className="fa fa-location-dot"></i></span>
                                    <input type="text" id="destiny" name="destiny" value={destiny} onChange={handleDestinyChange} required />
                                    <label>Destino</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className="fa-sharp fa-solid fa-brazilian-real-sign"></i></span>
                                    <input type="number" id="preco" name="preco" value={preco} onChange={handlePrecoChange} min="0" max="4" required />
                                    <label>Preço</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><span className="material-icons">
                                        airline_seat_recline_normal
                                    </span></span>
                                    <input type="number" id="qtd_acentos" name="qtd_acentos" value={qtdAcentos} onChange={handleQtdAcentosChange} min="0" max="6" required />
                                    <label>Vagas Totais</label>
                                </div>
                            </div>
                            <div className="container right">
                                <div className="times">
                                    <div id="time1">
                                        <label >
                                            <>
                                                Horário da Carona
                                            </>
                                        </label>
                                        <Input
                                            type="time"
                                            id="time"
                                            value={timeSegunda}
                                            onChange={(e) => handleTimeChange('segunda', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Adicione mais divs para outros dias da semana conforme necessário */}
                                </div>
                            </div>
                            {/* <div className="fixo mark">
                                <input type="checkbox" id="fixo" />
                                <div className="explicacao">Selecione esta opção se você estiver oferecendo carona regularmente nos mesmos
                                    horários. Isso irá permitir que você salve seus horários fixos e poupe tempo no futuro.</div>
                                <label for="fixo">Guardar Horários? (Carona Fixa)</label>
                            </div> */}
                            <button type="submit" name="submit3" className="btn_menu2"
                            // onClick="mostrarValores(event)"
                            >
                                <span id="Button-text" className="button-text">Anunciar Carona!</span>
                            </button>
                        </form>
                    </div>
                </Container_Style>
                <Caronas>
                    <h1>Suas Caronas</h1>
                    <Container_Cards>
                        {caronas.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="image-content">
                                    <span className="overlay"></span>
                                    <div className="card-image">
                                        <img src={item.motorista[1]} alt="" className="card-img" />
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h2 className="name">{item.motorista[2]}</h2>
                                    <h2 className="description">
                                        Veículo: <span className="veiculo">{item.veiculo}</span><br />
                                        Origem: <span className="origem">{item.origem}</span><br />
                                        Destino: <span className="destino">{item.destino}</span><br />
                                        Horário: <span className="horario">{item.hora_saida.slice(0, -3)}</span><br />
                                        Preço: R$ <span className="preco">{item.preço}</span><br />
                                        Vagas <span className="preco">{item.vagas}</span><br />
                                    </h2>
                                    <Container_buttons>
                                        <button className="button" onClick={() => { setmodal(true); Transfer_infos(item.destino, item.origem, item.preço, item.vagas, item.veiculo, item.hora_saida.slice(0, -3)); setID(item.id) }}>Editar</button>
                                        <button className="button" onClick={() => Delete(item.id)} style={{ backgroundColor: '#e12e2e' }}>Apagar</button>
                                    </Container_buttons>
                                </div>
                            </div>
                        ))}
                    </Container_Cards>
                </Caronas>
                <Modal tela={modal}>
                    <Icon_close onClick={() => setmodal(false)}><CgClose /></Icon_close>
                    <form action="#" onSubmit={Submit_New}>
                        <Container_infos>
                            <div className="direita">
                                <div className="input-box">
                                    <span className="icon"><i className="fa fa-location-dot"></i></span>
                                    <input type="text" id="origin" name="origin" value={origin_Edit} onChange={handleOriginChange_Edit} />
                                    <label>Origem</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className="fa fa-location-dot"></i></span>
                                    <input type="text" id="destiny" name="destiny" value={destiny_Edit} onChange={handleDestinyChange_Edit} />
                                    <label>Destino</label>
                                </div>
                            </div>
                            <div className="esquerda">
                                <div className="input-box">
                                    <span className="icon"><i className="fa-sharp fa-solid fa-brazilian-real-sign"></i></span>
                                    <input type="number" id="preco" name="preco" value={preco_Edit} onChange={handlePrecoChange_Edit} min="0" max="4" />
                                    <label>Preço</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><span className="material-icons">
                                        airline_seat_recline_normal
                                    </span></span>
                                    <input type="number" id="qtd_acentos" name="qtd_acentos" value={qtdAcentos_Edit} onChange={handleQtdAcentosChange_Edit} min="0" max="6" />
                                    <label>Vagas Totais</label>
                                </div>
                            </div>
                        </Container_infos>
                        <Time
                            type="time"
                            id="time"
                            value={timeSegunda_Edit}
                            onChange={(e) => handleTimeChange_Edit('segunda', e.target.value)}
                            required
                        />
                        <button type='submit'>Editar</button>
                    </form>
                </Modal>
            </Menu2_Style>
        ) : (
            <SegurancaMenu tela={activateTela} >
                <div className="seguranca">
                    <div className={style.container_wrapper}>
                        <div className={style.wrapper3}>
                            <div className={styles.form_box}>
                                <h2 style={h2_style}>Seja um Motorista!</h2>
                                <FormGeneric act={'#'}>
                                    <div className={styles.input_box}>
                                        <span className={styles.icon}><FaAddressCard /></span>
                                        <input type="number" value={InputCNH} id="email_entrada" onChange={handleInputCNH} required />
                                        <label>N° Registro (CNH)</label>
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.icon}>
                                            <FaCarSide />
                                        </span>
                                        <input type="text" value={InputPlaca_Carro} id="senha_entrada" onChange={handleInputPlaca_Carro} required />
                                        <label>Placa do Carro</label>
                                    </div>
                                    <Button_p action={handleAddTaskClick} nome={styles.btn_1}>
                                        <div className="login-name">Cadastrar</div>
                                        {/* <div className="loading login">Loading</div> */}
                                    </Button_p>
                                    <div className={styles.login_register}>
                                        <p>Ainda não possui uma conta? <a onClick={() => (Change(false), document.getElementById('tela1').click(), document.getElementById('Caroneiro').click())} className="register-link">Registrar</a></p>
                                    </div>
                                </FormGeneric>
                            </div>
                        </div>
                    </div>
                </div>
            </SegurancaMenu>
        )
    )
}

export default Menu2;