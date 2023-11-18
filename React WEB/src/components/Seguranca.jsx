import React, { useEffect, useState } from 'react';
import style from './SCSS/Modal.module.css';
import FormGeneric from './form';
import styles from './SCSS/login_form.module.css';
import { FaAddressCard } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import Button_p from './button';
import styled from 'styled-components';
import axios from 'axios';

const SegurancaMenu = styled.div`
    .seguranca{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: transform 1s ease, height .2s ease;
        transform: ${prop => (prop.tela ? 'translateY(0)' : 'translateY(-200%)')};
    }
`
const Menu2_Style = styled.div`
    transform: ${prop => prop.tela ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50px;
    left: 0;
    height: 100%;
    width: 100%;
`;

const Container_Style = styled.div`
    position: absolute;
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
`
const Input = styled.input`
    text-align: center;
    border-radius: 20px;
    border: none;
    color: black;
    width: 120px;
    font-size: 20px;
    
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

    useEffect(() => {
        const storedCNH = sessionStorage.getItem('cnh');
        const storedPlacaCarro = sessionStorage.getItem('placa_carro');

        if (storedCNH || storedPlacaCarro) {
            setInputCNH(storedCNH);
            setInputPlaca_Carro(storedPlacaCarro);
            setChangewindow(true);
        }
    }, []);

    const inputs = [
        {}
    ]
    const inputs2 = [
        {}
    ]
    const inputs3 = [
        {}
    ]
    const Subtmit = async (e) => {
        e.preventDefault();
        const data = {
            'hora_saida': timeSegunda,
            'veiculo':selectedOption,
            'origem':origin,
            'destino':destiny,
            'preco':preco,
            'qtd_acentos':qtdAcentos,
            'motorista': 1
        }
        axios.post('http://127.0.0.1:8000/anuncios/rides/',data, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(res => console.log(res))
            .catch(e => console.error(e));
    }
    return (
        Changewindow ? (
            <Menu2_Style tela={activateTela} >
                <Container_Style>
                    <div className="form-box anuncio-caronas">
                        <h2>Informações</h2>
                        <form action="#" onSubmit={Subtmit}>
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