import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Header from '../../components/Header';
import B_Entrar from '../../components/B_Entrar';
import B_car_fat from '../../components/B_car_fat';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import image from '../../../Public/Imagens/Caronas_FAT icon2.png'
import image2 from '../../../Public/Imagens/Imagem2.png'
import image3 from '../../../Public/Imagens/Imagem1.png'

const Main = styled.main`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    width: 100%;
    padding-bottom: 20px;
`
const Car_Logo = styled.img`
    position: absolute;
    top: -5%;
    left: 200px;
    width: 200px;
    height: 200px;
    @media screen and (max-width: 1080px) {
        top: 13%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`
const Titulo = styled.h2`
    @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Caveat:wght@500&family=Oswald:wght@300&family=Raleway:ital,wght@1,200&display=swap');
    font-family: 'Oswald';
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-weight: 300;
    font-size: 20px;
    background-color: #2196F3;
    color: white;
    width: 600px;
    height: 100px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    text-align: center;
    box-shadow: -4px 5px 4px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 510px) {
        font-size: 15px;
        width: 90%;
    }
`
const Area_Inicial = styled.div`
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 95%;
    height: 600px;
    background-color: #2196F3;
    border-radius: 50px;
    box-shadow: -4px 5px 4px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 1080px) {
        top: 180%;
        height: 1500px;
    }
`
const Titulo2 = styled.h2`
    position: absolute;
    left: 50%;
    top: 10%;
    text-align: center;
    transform: translate(-50%,-50%);
    width: 200px;
    height: 100px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    background-color: #1976D2;
    box-shadow: -4px 5px 4px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 1080px) {
        top: 5%;
    }
`
const Image_represent = styled.img`
    position: absolute;
    left: 25%;
    top: 60%;
    transform: translate(-50%,-50%);
    width: 450px;
    height: 400px;
    @media screen and (max-width: 1080px){
        width: 300px;
        height: 500px;
        left: 50%;
        top: 35%;
    }
`
const Image_represent2 = styled.img`
    position: absolute;
    left: 70%;
    top: 60%;
    transform: translate(-50%,-50%);
    width: 450px;
    height: 400px;
    @media screen and (max-width: 1080px){
        width: 350px;
        height: 500px;
        left: 50%;
        top: 70%;
    }
`
const Home = () => {
    const history = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        const conteudoChave = sessionStorage.getItem('auth_token');

        if (conteudoChave) {
            history('/logado'); // Substitua pelo caminho real da sua tela de logado
        }
    }, []); // O array de dependências está vazio, então este efeito será executado apenas uma vez ao montar o componente

    const pop_pup = () => {
        setOpenModal(true);
    };

    const registro = async (diretorio, email, password, re_password, name, cnh, placa_carro) => {
        const Data = [diretorio, email, password, re_password, name, cnh, placa_carro];
        const Data2 = ['diretorio', 'email', 'password', 're_password', 'name', 'cnh', 'placa_carro'];
        const formData = new FormData();

        for (let i = 0; i < Data.length; i++) {
            formData.append(Data2[i], Data[i]);
        }


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };


        axios.post('http://127.0.0.1:8000/api/auth/users/', formData, config)
            .then((result) => alert('Email de ativação de conta enviado com sucesso! \nPara ativar sua conta, verifique seu email.'))
            .catch((error) => console.error(error));
    }

    const login = async (email, senha) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', senha);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };


        await axios.post('http://127.0.0.1:8000/api/auth/token/login/', formData, config)
            .then(async (res) => {
                sessionStorage.setItem('auth_token', res.data.auth_token);
                await axios.get('http://127.0.0.1:8000/api/auth/users/me/', {
                    headers: {
                        Authorization: `Token ${res.data.auth_token}`
                    }
                })
                    .then((res) => {
                        // Percorrendo as chaves do objeto
                        for (const chave in res.data) {
                            if (res.data.hasOwnProperty(chave)) {
                                const conteudo = res.data[chave];

                                // Armazenando no sessionStorage
                                sessionStorage.setItem(chave, conteudo);
                            }
                        }
                        history('/logado');
                    })
                    .catch((e) => {
                        console.error(e);
                    })
            }).catch((e) => {
                if (e.response.data.non_field_errors[0] == 'Unable to log in with provided credentials.') {
                    alert('Não foi possível fazer o login. Por favor verifique seu e-mail ou senha novamente!')
                } else {
                    console.error(e);
                }
            })
    };



    return (
        <>
            <Header>
                <B_car_fat />
                <B_Entrar Pop_up={pop_pup} />
            </Header>
            <Main>
                <Modal Log_func={login} isOpen={openModal} SetModal={setOpenModal} Reg_func={registro} />
                <Titulo>Explore o mais recente aplicativo universitário, desenvolvido especialmente para aprimorar a mobilidade dos estudantes até a universidade, proporcionando uma jornada mais eficiente e conectada.</Titulo>
                <Area_Inicial>
                    <Car_Logo src={image} />
                    <Titulo2>Seja bem vindo a sua área de aluno!</Titulo2>
                    <Image_represent src={image2}></Image_represent>
                    <Image_represent2 src={image3}></Image_represent2>
                </Area_Inicial>
            </Main>
        </>
    );
}

export default Home;