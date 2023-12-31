import React from 'react';
import Anuncios_Caronas from './Container_anuncios';
import { FaWhatsapp } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import style from './SCSS/Menu1.module.css'
import styled from 'styled-components'
import image1 from '../../Public/Imagens/Design_sem_nome-removebg-preview.png'
import image2 from '../../Public/Imagens/profile-pic (2).png'
import image3 from '../../Public/Imagens/profile-pic (1).png'

const Titulo = styled.h3`
    width: 200px;
    height: 50px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: aquamarine;
    border-radius: 15px;
    @media screen and (max-width: 768px) {
        top: 50%;
    }
    @media screen and (min-width: 769px) {
        top: 60%;
    }

`
const Container_developers = styled.div`
        position: absolute;
        display: flex;
        justify-content: center;
        top: 80%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 90%;
        height: 300px;
        background-color: aqua;
        border-radius: 20px;
    @media screen and (max-width: 870px) {
        top: 76%;
        height: 900px;
    }
`
const Container_M = styled.div`
        position: absolute;
        width: 100%;
        height: 200px;
        right: 30%;
        top: 10%;
        display: flex;
        justify-content: center;
    @media screen and (max-width: 870px) {  
        right: 0;
        top: 2%;
    }   
`
const Container_P = styled.div`
        position: absolute;
        width: 100%;
        height: 200px;
        top: 2%;
        display: flex;
        justify-content: center;
    @media screen and (max-width: 870px) {
        position: absolute;
        width: 100%;
        height: 200px;
        top: 28%;
        display: flex;
        justify-content: center;
    }
`
const Container_V = styled.div`
    position: absolute;
    width: 100%;
    height: 200px;
    left: 30%;
    top: 2%;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 870px) {
    left: 0;
    top: 64%;
}
`
const Nome_M = styled.h4`
    position: absolute;
    top: -5px;
    color: white;
    font-size: xx-large;
    `
const Nome_P = styled.h4`
        position: absolute;
        top: 12%;
        color: white;
        font-size: xx-large;
    @media screen and (max-width: 870px) {
        position: absolute;
        top: 20%;
        color: white;
    }

`
const Nome_V = styled.h4`
        position: absolute;
        top: 5%;
        color: white;
        font-size: x-large;
`
const Img_M = styled.img`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 900px;
        height: 500px;
        border-radius: 80%;
    @media screen and (max-width: 870px) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 900px;
        height: 500px;
        border-radius: 80%;
    }
`
const Img_P = styled.img`
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 130px;
        height: 130px;
    @media screen and (max-width: 870px) {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 130px;
        height: 130px;
    }
`
const Img_V = styled.img`
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 130px;
        height: 130px;
    @media screen and (max-width: 870px) {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 130px;
        height: 130px;
    }
`
const SocialMedia_M = styled.div`
    ul {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    margin: 0;
    display: flex;
}
ul li {
    list-style: none;
    margin: 0 10px;
}
ul li a{
    color: #000000;
    font-size: 25px;
    line-height: 50px;
    transition: .5s;
}
ul li a:hover {
    color: #ffffff;
}
ul li a {
    position: relative;
    padding-top: 3px;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    text-align: center;
    transition: 0.5s;
    transform: translate(0,0px);
    box-shadow: 0px 7px 5px rgba(0, 0, 0, 0.5);
}
ul li a:hover {
    transform: rotate(0deg) skew(0deg) translate(0, -10px);
}
ul li:nth-child(1) a:hover {
    background-color: rgb(37,211,102);
}
ul li:nth-child(2) a:hover {
    background-color: #21262d;
}
ul li:nth-child(3) a:hover {
    background-color: #e4405f;
}
ul li:nth-child(4) a:hover {
    background-color: #0077B5;
}
`
const SocialMedia_P = styled.div`
    ul {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    margin: 0;
    display: flex;
}
ul li {
    list-style: none;
    margin: 0 10px;
}
ul li a{
    color: #000000;
    font-size: 25px;
    line-height: 50px;
    transition: .5s;
}
ul li a:hover {
    color: #ffffff;
}
ul li a {
    position: relative;
    padding-top: 3px;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    text-align: center;
    transition: 0.5s;
    transform: translate(0,0px);
    box-shadow: 0px 7px 5px rgba(0, 0, 0, 0.5);
}
ul li a:hover {
    transform: rotate(0deg) skew(0deg) translate(0, -10px);
}
ul li:nth-child(1) a:hover {
    background-color: #21262d;
}

ul li:nth-child(2) a:hover {
    background-color: #0077B5;
}
`
const SocialMedia_V = styled.div`
    ul {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    margin: 0;
    display: flex;
}
ul li {
    list-style: none;
    margin: 0 10px;
}
ul li a{
    color: #000000;
    font-size: 25px;
    line-height: 50px;
    transition: .5s;
}
ul li a:hover {
    color: #ffffff;
}
ul li a {
    position: relative;
    padding-top: 3px;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    text-align: center;
    transition: 0.5s;
    transform: translate(0,0px);
    box-shadow: 0px 7px 5px rgba(0, 0, 0, 0.5);
}
ul li a:hover {
    transform: rotate(0deg) skew(0deg) translate(0, -10px);
}
ul li:nth-child(1) a:hover {
    background-color: #21262d;
}
ul li:nth-child(2) a:hover {
    background-color: #0077B5;
}
`
const Menu1 = ({ tela, ClickButton, funcClick }) => {
    const menu1Style = {
        transform: tela ? 'translateX(-150%) ' : 'translateX(0)',
        overflow: tela ? 'hidden' : 'visible'
    }
    return (
        <div className={style.menu1} style={menu1Style}>
            <Anuncios_Caronas ButtonClick={ClickButton} funcClick={funcClick} />
            <Titulo>Desevolvedores</Titulo>
            <Container_developers>
                <Container_M>
                    <Nome_M>Matheus Manassés</Nome_M>
                    <Img_M src={image1}></Img_M>
                    <SocialMedia_M>
                        <ul>
                            <li><a href="https://wa.me/5521991299336?text=Ol%C3%A1.+Vi+seu+projeto+e+gostaria+de+um+projeto+pra+mim+tamb%C3%A9m%21"> <FaWhatsapp /></a></li>
                            <li><a href="https://github.com/MattLimaNascimento"> <FaGithub /> </a></li>
                            <li><a href="https://www.instagram.com/mattlimadn/"> <FaInstagram /> </a></li>
                            <li><a href="https://www.linkedin.com/in/matheus-manassés-lima-do-nascimento-643668242/"> <FaLinkedinIn /> </a></li>
                        </ul>
                    </SocialMedia_M>
                </Container_M>
                <Container_P>
                    <Nome_P>Pedro Vitor</Nome_P>
                    <Img_P src={image2}></Img_P>
                    <SocialMedia_P>
                            <ul>
                                <li><a href="https://github.com/pedrosouzacan"> <FaGithub /> </a></li>
                                <li><a href="https://www.linkedin.com/in/pedro-victor-santos-de-souza-6ba14724a/"> <FaLinkedinIn /> </a></li>
                            </ul>
                    </SocialMedia_P>
                </Container_P>
                <Container_V>
                    <Nome_V>Professor Responsável: <br/>Vahid Nikoofard</Nome_V>
                    <Img_V src={image3}></Img_V>
                    <SocialMedia_V>
                            <ul>
                                <li><a href="https://github.com/vnikoofard"> <FaGithub /> </a></li>
                                <li><a href="https://www.linkedin.com/in/vnikoofard/?originalSubdomain=br"> <FaLinkedinIn /> </a></li>
                            </ul>
                    </SocialMedia_V>
                </Container_V>
            </Container_developers>
        </div>

    );
}

export default Menu1;