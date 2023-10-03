import React, { useEffect } from 'react';
import styles from '../pages/Logado/sass/anuncios.module.scss';

const Anuncios_Caronas = () => {

    useEffect(() => {
        new Swiper(".slide-content", {
            slidesPerView: 3,
            spaceBetween: 25,
            loop: true,
            centerSlide: 'true',
            fade: 'true',
            grabCursor: 'true',
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                520: {
                    slidesPerView: 2,
                },
                950: {
                    slidesPerView: 3,
                },
            },
        });
    }, []);

    const itens = [
        {
            imagem: '../../Public/Imagens/profile-pic.png', nome: 'Matheus', veiculo: 'Carro', origem: 'Uerj', destino: 'graal', horario: '12:30', preco: 3, vagas: 3
        },
        {
            imagem: '../../Public/Imagens/profile-pic (2).png', nome: 'Pedro', veiculo: 'Carro', origem: 'Uerj', destino: 'graal', horario: '12:30', preco: 3, vagas: 1
        }
    ]


    return (
        <div className={styles.containerAnuncios_caronas}>
            <header className={styles.rodape_anuncios}>
                <h2>Caronas Fixas Por Dia da Semana</h2>
            </header>
            <div className="slide-container swiper">
                <div className="slide-content">
                    <div className="card-wrapper swiper-wrapper" id="anuncios_caronas">
                        {itens.map((item, index) => {
                            const botoes = [];

                            for (let i = 1; i <= item.vagas; i++) {
                                botoes.push(
                                    <button className="button" key={i}>
                                        {i === 1 ? 'Frente' : 'Atrás'}
                                    </button>
                                );
                            }

                            return (
                                <div className="card swiper-slide" key={index}>
                                    <div className="image-content">
                                        <span className="overlay"></span>
                                        <div className="card-image">
                                            <img src={item.imagem} alt="" className="card-img" />
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <h2 className="name">{item.nome}</h2>
                                        <h2 className="description">
                                            Veículo: <span className="veiculo">{item.veiculo}</span><br />
                                            Origem: <span className="origem">{item.origem}</span><br />
                                            Destino: <span className="destino">{item.destino}</span><br />
                                            Horário: <span className="horario">{item.horario}</span><br />
                                            Preço: R$ <span className="preco">{item.preco}</span><br />
                                        </h2>
                                        {item.veiculo === 'moto' ? (
                                            <button className="button">Garupa</button>
                                        ) : (
                                            <div>{botoes}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="swiper-button-next swiper-navBtn"></div>
                <div className="swiper-button-prev swiper-navBtn"></div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
}

export default Anuncios_Caronas;