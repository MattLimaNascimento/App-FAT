import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from '../components/SCSS/Modal.module.css';
import { CgClose } from 'react-icons/cg';
import styled from 'styled-components';
import { BiSolidLockAlt } from 'react-icons/bi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import axios from 'axios';
import image from '../../Public/Imagens/Logo(Uerj).png';

const Input = styled.div`
    display: flex;
    position: relative;
    width: 100%;
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
    };

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
    };

    input:focus~label,
    input:valid~label {
        top: -5px;
    };
`
const Icon = styled.span`
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: black;
    line-height: 57px;
`
const Container = styled.div`
    width: 330px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Button_Submit = styled.button`
    width: 330px;
    height: 45px;
    background: black;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    transition: 0.5s;
    font-family: "Roboto", Arial;
    font-size: 14px;
    overflow: hidden;
    z-index: 1;
    position: absolute;
    top: 77%;
    left: 50%;
    transform: translate(-50%,-50%);
    &:hover {
        background-color: #1976D2;
    }
`
const Eyes = styled.div`
    position: absolute;
    top: 90px;
    right: 70px;
    z-index: 999;
    cursor: pointer;
    font-size: large;
    .open {
        position: absolute;
        right: 0px;
    }
`
const Eyes2 = styled.div`
    position: absolute;
    top: 170px;
    right: 70px;
    z-index: 999;
    cursor: pointer;
    font-size: large;
    .open {
        position: absolute;
        right: 0px;
    }
`
const Button_Style = styled.button`
    width: 10em;
    position: absolute;
    height: 3.5em;
    border: 3px ridge #149CEA;
    outline: none;
    background-color: transparent;
    color: #007aff;
    transition: 1s;
    border-radius: 0.3em;
    font-size: 16px;
    font-weight: bold;
    top: 420px;
    cursor: pointer;
    &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #fae8b8;
    transition: 0.5s;
    transform-origin: center;
    }
    &::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #fae8b8;
    transition: 0.5s;
    }
    &:hover::before, &:hover::after {
    transform: scale(0)
    }
    &:hover {
    box-shadow: inset 0px 0px 25px #1479EA;
    }
`
const Container_Geral = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Reset_Password = () => {
    const [InputPassWord, setInputPassWord] = useState();
    const [Re_InputPassWord, setRe_InputPassWord] = useState();
    let { uid, token } = useParams();
    const [IsOpen, setIsOpen] = useState(false);
    const [login_act, setlogin_act] = useState(false);
    const [Pass, setPass] = useState(false);
    const [Pass2, setPass2] = useState(false);
    const history = useNavigate();

    const handleInputPassWord = (e) => {
        setInputPassWord(e.target.value);
    };

    const handleRe_InputPassWord = (e) => {
        setRe_InputPassWord(e.target.value);
    };

    const modalStyle = {
        transform: IsOpen ? 'scale(1)' : 'scale(0)',
        height: '340px',
    };

    const eyes = {
        opacity: Pass ? 1 : 0,
        overflow: Pass ? 'visible' : 'hidden',
    };

    const eyes2 = {
        opacity: Pass2 ? 1 : 0,
        overflow: Pass2 ? 'visible' : 'hidden',
    };

    const inputFields = [
        { onchange: handleInputPassWord, type: Pass ? 'text' : 'password', name: 'senha_registro', id: 'senha_registro', label: 'Senha', icon: <BiSolidLockAlt /> },
        { onchange: handleRe_InputPassWord, type: Pass2 ? 'text' : 'password', name: 'senha_registro', id: 'senha_registro', label: 'Confirmar Senha', icon: <BiSolidLockAlt /> }
    ];

    const SendData = async () => {
        const infos = {
            'uid': uid,
            'token': token,
            'new_password': InputPassWord,
            're_new_password': Re_InputPassWord
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.post('http://127.0.0.1:8000/api/auth/users/reset_password_confirm/', infos, config)
        .then(response => {
            if (response.status == 204) {
                alert('Senha trocada com sucesso!');
                history('/');
            }
        })
        .catch(err => console.error(err));
    }

    const Submit = (e) => {
        e.preventDefault()
        InputPassWord == Re_InputPassWord ? (
            SendData()
        ) : (
            alert('As senhas devem ser iguais')
        )
    }

    const Close = () => {
        setIsOpen(!IsOpen);
    }

    const Logo_style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const Container_Wrapper = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: IsOpen? 20:-1,
    }
    return (
        <>
            <Container_Geral>
                <img src={image} alt="logo Uerj" style={Logo_style} />
                <Button_Style IsOpen={IsOpen} onClick={() => setIsOpen(true)}>Mudar Senha</Button_Style>
                <div style={Container_Wrapper}>
                    <div className={style.wrapper} style={modalStyle}>
                        <span className={style.icon_close} onClick={Close} ><CgClose /></span>
                        <form onSubmit={Submit}>
                            <Eyes onClick={() => setPass(!Pass)}>
                                <VscEyeClosed style={eyes} className='closed' />
                                <VscEye className='open' />
                            </Eyes>
                            <Eyes2 onClick={() => setPass2(!Pass2)}>
                                <VscEyeClosed style={eyes2} className='closed' />
                                <VscEye className='open' />
                            </Eyes2>
                            <Container>
                                {inputFields.map((field, index) => (
                                    <Input key={index}>
                                        <Icon>{field.icon}</Icon>
                                        <input type={field.type} name={field.name} id={field.id} onChange={field.onchange} required />
                                        <label>{field.label}</label>
                                    </Input>
                                ))}
                            </Container>
                            <Button_Submit Type={'submit'}>Mudar senha</Button_Submit>
                        </form>
                    </div>
                </div>
            </Container_Geral>
        </>
    );
}
export default Reset_Password;