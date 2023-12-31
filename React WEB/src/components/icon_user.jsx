import React, { useEffect, useState } from 'react';
import style from './SCSS/User_img.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Sinal_style = styled.div`
    background-color: #2196F3;
    position:absolute;
    right: 2.5%;
    color: #eee;
    width: 17px;
    height: 17px;
    border-radius: 50px;
    visibility: ${prop => prop.sinal ? 'visible' : 'hidden'};
    opacity: ${prop => prop.sinal ? 1 : 0};
`

const Sinal2_style = styled.div`
    background-color: #2196F3;
    position:absolute;
    display: flex;
    right: 2.5%;
    justify-content: center;
    align-items: center;
    color: #eee;
    width: 17px;
    height: 17px;
    border-radius: 50px;
    visibility: ${prop => prop.sinal ? 'visible' : 'hidden'};
    opacity: ${prop => prop.sinal ? 1 : 0};
`

const ModalCaronas = styled.div`
    position: absolute;
    top: 500px;
    left: 50%;
    width: 350px;
    height: 410px;
    background: #fff;
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 25px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    overflow: hidden;
    transform: translate(-50%,-50%) ${prop => prop.act ? 'scale(1)' : 'scale(0)'};
    transition: transform .5s ease, height .2s ease;
    z-index: 2;
    .icon_close {
        color: #FFF;
        position: absolute;
        font-size: 40px;
        padding-top: 10px;
        cursor: pointer;
        left: 300px;
    }

    .overlay2 {
        position: absolute;
        left: 306px;
        top: 122px;
        height: 40px;
        width: 40px;
        background-color: #2196F3;
        border-radius: 25px 25px 0 25px;
    }
    .overlay2::before,
    .overlay2::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: -50px;
        height: 50px;
        width: 40px;
        background-color: #2196F3;
    }

    .overlay2::after {
        border-radius: 0 60px 0 0;
        background-color: #FFF;

    }

    .rodape_reservas{
        background-color: #2196F3;
        border-radius: 25px 25px 0 25px;
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    .motorista_img {
        border: 4px solid #FFF;
        width: 40%;
        border-radius: 50%;
    }

    .main_reservas {
        display: flex;
        justify-content: center;
        padding-top: 5%;
    }

    .name_reserva {
        display: flex;
        justify-content: center;
        color: black;
        font-size: xx-large;
    }

    .infos_reservas {
        padding-top: 20px;
        font-size: 20px;
        color: #707070;
        text-align: center;
    }

`

const Footer_style = styled.footer`
    position: absolute;
    background-color: #707070;
    top: 90%;
    left: 27%;
    transform: translate(-50%,-50%);
    background-color: #FFF;

    .desmarcar {
        font-family: 'Inter', sans-serif;
        font-size: 17px;
        width: 150px;
        height: 35px;
        border: none;
        color: #FFF;
        background-color: #2196F3;
        border-radius: 5px;
        position: absolute;
        cursor: pointer;
        transition: .5s;
    }
    
    .desmarcar:hover {
        background-color: #1976D2;
    }
    
`
const Modal_PessoasConfirmadas = styled.div`
    position: absolute;
    top: 450px;
    left: 50.4%;
    width: 350px;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 40px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    overflow: hidden;
    padding: 6px;
    transform: translate(-50%,-50%) ${prop => prop.act ? 'scale(1)' : 'scale(0)'};
    transition: transform .5s ease, height .2s ease;
    z-index: 2;

.confirmado {
    padding: 4px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
}
.confirmados {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 40px;
    background-color: #2196F3;
    width: 100%;
    height: auto;
    border: 3px solid #fff;
    color: #fff;
}
.confirmados i {
    font-size: 25px;
}
.rodape_confirmados {
    display: flex;
    position: relative;
    align-items: center;
    
    padding-bottom: 20px;
    color: black;
}
#icon-close-4 {
    position: absolute;
    top: -5px;
    right: -5px;
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
}
#icon-close-4:hover {
    background-color: #1976D2;
}
.confirmados_title {
    padding-left: 15px;
    font-size: 1.8em;
    color: black;
    text-align: center;
}
`
const User_Imag = ({ Image, Nome, Email }) => {
    const [activeUserInfos, setactiveUserInfos] = useState(false);
    const [Sinal, setSinal] = useState(false);
    const [Sinal2, setSinal2] = useState(false);
    const [DataInfos, setDataInfos] = useState();
    const [Modal_act, setModal_act] = useState(false);
    const [ModalPess, setModalPess] = useState(false);
    const [Pess_conf, setPess_conf] = useState([]);


    const history = useNavigate();

    const userStyle = {
        visibility: activeUserInfos ? 'visible' : 'hidden',
        opacity: activeUserInfos ? 1 : 0
    }

    const Logout = () => {
        const shouldLogout = window.confirm("Tem certeza de que deseja sair?");

        if (shouldLogout) {
            sessionStorage.clear();
            history('/');
        }
    }

    const Caronas_ok = () => {
        if (DataInfos == '' || DataInfos == undefined) {
            alert("Você não possui Caronas!");
        } else {
            setModal_act(true);
        }
    }

    const Desmarcar = () => {
        const quest = window.confirm('Deseja desmarcar esta carona?');
        const data = {
            "id": sessionStorage.getItem("id"),
            "Tipo": "Remover"
        }
        const Send = async () => {
            await axios.post(`http://127.0.0.1:8000/anuncios/rides/passenger/${DataInfos.id}/`, data, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then(res => {
                    alert('Carona Desmarcada com sucesso!');
                    window.location.reload();
                })
                .catch(e => console.error(e))
        }

        quest ? (
            Send()
        ) : (null)
    }


    useEffect(() => {
        const Pessoas_confirmadas = () => {
            const verify = async () => {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/anuncios/rider-caronas/${sessionStorage.getItem('id')}/`);
                    
                    if (res.data.length > 0) {
                        // Encontrar o objeto com a menor hora de saída
                        const menorHoraObjeto = res.data.reduce((menor, obj, index) => {
                            if (index === 0) {
                                return obj; // Primeiro objeto, não há nada para comparar ainda
                            }

                            const horaAtual = obj.hora_saida;
                            const menorHora = menor.hora_saida;

                            return horaAtual < menorHora ? obj : menor;
                        });
                        
                        // Acesso à informação da chave 'passageiros' do objeto com a menor hora
                        const passageirosDaMenorHora = menorHoraObjeto.passageiros;
                        
                        // Agora você pode fazer o que quiser com a informação
                        if (passageirosDaMenorHora.length > 0) {
                            setSinal2(true);
                        }
                        setPess_conf(passageirosDaMenorHora);
                    } else {
                        console.log('A lista está vazia.');
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            verify();
        };


        const Verification_UserCaronas = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/anuncios/user-rides/${sessionStorage.getItem('id')}/`);
                if (res.data[0] !== undefined) {
                    setSinal(true);
                    setDataInfos(res.data[0]);
                }
            } catch (error) {
                console.error(error);
            }

        }
        Pessoas_confirmadas();
        Verification_UserCaronas();
    }, []);

    return (
        <>
            <div className={style.container} >
                <div className={style.action_user}>
                    <div onClick={() => setactiveUserInfos(!activeUserInfos)} className={style.profile_user} id="profile">
                        {Image ? <img src={Image} alt="profile-img" /> : null}
                    </div>
                    <div className={style.menu_user} style={userStyle}>
                        <h3>{Nome}<br /><span>{Email}</span></h3>
                        <ul>
                            <li id={'Caronas_confirmadas'} onClick={()=> {
                                if (Pess_conf.length > 0) {
                                    setModalPess(true)
                                } else {
                                    alert('Você não tem nenhuma carona confirmada!')
                                }
                                }}>
                                <i className={"fa-solid fa-user-check"}></i>
                                <a href="#">{'Caronas Confirmadas'}</a>
                                <Sinal2_style sinal={Sinal2}>{Pess_conf.length}</Sinal2_style>
                            </li>
                            <li id={"Carona_ok"} onClick={Caronas_ok}>
                                <i className={"fa fa-car-side"}></i>
                                <a href="#">{'Carona Marcada'}</a>
                                <Sinal_style sinal={Sinal}></Sinal_style>
                            </li>
                            <li id={"logout-btn"} onClick={Logout}>
                                <i className={"fa-solid fa-right-from-bracket"}></i>
                                <a href="#">{'Sair'}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {DataInfos && Object.keys(DataInfos).length !== 0 ? (
                <ModalCaronas act={Modal_act}>
                    {/* Se DataInfos não estiver vazio, renderize o conteúdo da modal */}
                    <span className="icon_close" onClick={() => setModal_act(false)} id="icon-close-3"><ion-icon name="close"></ion-icon></span>
                    <header className="rodape_reservas">
                        <img src={DataInfos.motorista[1]} alt="motorita imagem" className="motorista_img" />
                    </header>
                    <span className="overlay2"></span>
                    <main className="main_reservas" >
                        <div className="infos">
                            <h3 className="name_reserva">{DataInfos.motorista[2]}</h3>
                            <h2 className="infos_reservas">
                                Origem: {DataInfos.origem}<br />
                                Destino: {DataInfos.destino}<br />
                                Preço: {DataInfos.preço}<br />
                                Veículo: {DataInfos.veiculo} <br />
                                Horário: <span className="horario_reserva">{DataInfos.hora_saida.slice(0, -3)}</span><br />
                            </h2>
                        </div>
                    </main>
                    <Footer_style>
                        <button className="desmarcar" onClick={Desmarcar} id="desmarcar">Cancelar Carona</button>
                    </Footer_style>
                </ModalCaronas>
            ) : (
                // Se DataInfos estiver vazio, renderize nada ou qualquer conteúdo alternativo desejado
                <>
                </>
            )}
            {Pess_conf && Object.keys(Pess_conf).length !== 0 ? (
                <Modal_PessoasConfirmadas act={ModalPess}>
                    <header class="rodape_confirmados">
                        <h2 class="confirmados_title">Caronas Confirmadas</h2>
                        <span class="icon_close2" id="icon-close-4" onClick={() => setModalPess(false)}><ion-icon name="close"></ion-icon></span>
                    </header>
                    {Pess_conf.map((item, index) => (
                        <li key={index} className="confirmados">
                            <img src={item.diretorio} alt="Confirmado" className="confirmado" />
                            <h2>{item.name}</h2>
                            <i className="fa-solid fa-user-check"></i>
                        </li>
                    ))}
                </Modal_PessoasConfirmadas>
            ) : (
                <>
                </>
            )}


        </>
    );
}

export default User_Imag;