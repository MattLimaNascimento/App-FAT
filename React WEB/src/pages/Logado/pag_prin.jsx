import React from 'react';
import Header_P from './header';
import './sass/pag_prin.scss';
import Main from './Main';
const Pag_principal = () => {
    return ( 
        <div className="conteudo">
            <Header_P/>
            <Main/>
        </div>
    );
}

export default Pag_principal;