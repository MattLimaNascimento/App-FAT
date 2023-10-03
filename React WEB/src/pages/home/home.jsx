import React, { useState } from 'react';
import "./sass/home.css";
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
    const [dados_user, setDadosUser] = useState({});

    const pop_pup = () => {
        setOpenModal(true);
    };

    const registro = async (foto, email, senha, usuario, cnh, placa_carro) => {
        const profile_new = {
            "nome": usuario,
            "diretorio": foto,
            "email": email,
            "senha": senha,
            "cnh": cnh,
            "placa_carro": placa_carro,
            "user": 1
        };
        axios.post('http://127.0.0.1:8000/rides/api/profiles/', profile_new, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            // .then((result) => console.log(result));
    }

    const login = async (email, senha) => {
        const { data } = await axios.get("http://127.0.0.1:8000/rides/api/profiles/");

        const user = data.results.find(task => task.email === email && task.senha === senha);
        let dados = null
        user ? (
            dados = {
                email: user.email,
                gender: user.gender,
                idade: user.idade,
                matricula: user.matricula,
                nome: user.nome
            },
            setDadosUser(dados_user),
            history('/logado')
        ) : alert('Credenciais inválidas. Por favor, tente novamente.');
    };



    return (
        <div className="conteudo">
            <Header>
                <B_car_fat/>
                <B_Entrar Pop_up={pop_pup} />
            </Header>
            <main>
                <Logo/>
                <Modal Log_func={login} isOpen={openModal} SetModal={setOpenModal} Reg_func={registro} />
            </main>
        </div>
    );
}

export default Home;