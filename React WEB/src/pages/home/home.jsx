import React, { useEffect, useState } from 'react';
import axios from "axios";
import Logo from '../../components/logo';
import Header from '../../components/Header';
import B_Entrar from '../../components/B_Entrar';
import B_car_fat from '../../components/B_car_fat';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';

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
                    .catch((e) => console.error(e))
            }).catch((e) => {
                console.error(e);
            })
    };



    return (
        <>
            <Header>
                <B_car_fat />
                <B_Entrar Pop_up={pop_pup} />
            </Header>
            <main>
                <Modal Log_func={login} isOpen={openModal} SetModal={setOpenModal} Reg_func={registro} />
            </main>
        </>
    );
}

export default Home;