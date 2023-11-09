import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import image from '../../Public/Imagens/Logo(Uerj).png';

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    `
const ButtonStyled = styled.button`
    color: #92adf8;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 20px;
    border: 2px solid #2196F3;
    padding: 10px 20px;
    font-size: 17px;
    font-weight: bold;
    background: transparent;
    position: relative;
    transition: all 1s;
    overflow: hidden;
    &:hover {
        color: white;
        cursor: pointer;
        &::before {
            width: 160%;
        }
    }
    &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 0%;
        top: 0;
        left: -40px;
        transform: skewX(45deg);
        background-color: #2196F3;
        z-index: -1;
        transition: all 1s;
    }
`
const Conainer_spinner = styled.div`
    --uib-size: 2.8rem;
    --uib-speed: .9s;
    --uib-color: #183153;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
    .dot-spinner__dot {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        width: 100%;
        &::before {
            content: '';
            height: 20%;
            width: 20%;
            border-radius: 50%;
            background-color: var(--uib-color);
            transform: scale(0);
            opacity: 0.5;
            animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
            box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
        }

        &:nth-child(2) {
            transform: rotate(45deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.875);
            }
        }
        &:nth-child(3) {
            transform: rotate(90deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.75);
            }
        }
        &:nth-child(4) {
            transform: rotate(135deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.625);
            }
        }
        &:nth-child(5) {
            transform: rotate(180deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.5);
            }
        }
        &:nth-child(6) {
            transform: rotate(225deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.375);
            }
        }
        &:nth-child(7) {
            transform: rotate(270deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.25);
            }
        }
        &:nth-child(8) {
            transform: rotate(315deg);
            &::before {
                animation-delay: calc(var(--uib-speed) * -0.125);
            }
        }
    }
    @keyframes pulse0112 {
        0%,
        100% {
            transform: scale(0);
            opacity: 0.5;
        }

        50% {
            transform: scale(1);
            opacity: 1;
        }
    }
`

const Activation = () => {
    let { uid, token } = useParams();
    const history = useNavigate();
    const [ativandoConta, setAtivandoConta] = useState(false);

    const Activate = async () => {
        setAtivandoConta(true); // Define o estado como "true" para mostrar o spinner

        const data = {
            "uid": uid,
            "token": token
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/auth/users/activation/', data, config);
            if (res.status === 204) {
                alert('Conta ativada com sucesso!');
                history('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setAtivandoConta(false); // Define o estado como "false" para ocultar o spinner após a operação
        }
    }

    return (
        <Container>
            <img src={image} alt="" />
            <ButtonStyled onClick={Activate} disabled={ativandoConta}>
                <span style={{ display: ativandoConta ? 'none' : 'inline' }}>Ative sua conta!</span>
                {ativandoConta && (
                    <Conainer_spinner>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                    </Conainer_spinner>
                )}
            </ButtonStyled>
        </Container>
    );
}

export default Activation;