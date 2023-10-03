import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Teste = () => {
    const [Word, setWord] = useState('');
    const [MyFile, setFile] = useState(null);

    const Submit = (e) => {
        const uploadData = new FormData();

        e.preventDefault();

        // Gera um ID único
        const id = uuidv4();

        // Obtém a extensão do arquivo original
        const extensao = MyFile.name.split('.').pop();

        // Constrói o novo nome do arquivo
        const novoNome = `${id}.${extensao}`;

        // Cria um novo arquivo com o mesmo conteúdo e novo nome
        const renamedFile = new File([MyFile], novoNome, { type: MyFile.type });

        setFile(renamedFile);

        uploadData.append('Titulo', Word);
        uploadData.append('File', renamedFile, renamedFile.name);
        
        fetch('http://127.0.0.1:8000/books/', {
            method: 'POST',
            body: uploadData
        })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }

    return (
        <>
            <form action="#">
                <input type="text" onChange={(e) => setWord(e.target.value)} />
                <input type="file" style={{ display: 'flex' }} onChange={(e) => setFile(e.target.files[0])} />
                <button type='submit' onClick={Submit}>Submit</button>
            </form>
        </>
    );
}

export default Teste;
