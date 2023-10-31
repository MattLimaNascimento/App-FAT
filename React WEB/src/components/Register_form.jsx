import React, { createRef, useRef, useState } from 'react';
import style from './SCSS/register_form.module.css';
import FormGeneric from './form';
import { MdEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import Button_p from './button';
import camera from "../../Public/Imagens/sem_foto.png";
import { v4 as uuidv4 } from 'uuid';

const RegisterForm = ({ login_Act, login_turn, Register_func }) => {

    const inputRef = useRef(null);
    const [image, setImage] = useState();
    const [InputEmail, setInputEmail] = useState();
    const [InputNome, setInputNome] = useState();
    const [InputPassWord, setInputPassWord] = useState();
    const [Re_InputPassWord, setRe_InputPassWord] = useState();
    const fileInput = createRef();

    const hundleImageClick = () => {
        inputRef.current.click();
    }
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };
    const handleInputNome = (e) => {
        setInputNome(e.target.value);
    };
    const handleInputPassWord = (e) => {
        setInputPassWord(e.target.value);
    };
    const handleRe_InputPassWord = (e) => {
        setRe_InputPassWord(e.target.value);
    };

    const hundleImageChange = (event) => {
        const file = event.target.files[0];
        const imgname = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(
                    img,
                    (maxSize - img.width) / 2,
                    (maxSize - img.height) / 2
                );
                canvas.toBlob((blob) => {
                    const file = new File([blob], imgname, {
                        type: "image/png",
                        lastModified: Date.now(),
                    });

                    setImage(file);
                }),
                    "image/jpeg",
                    0.8
            }
        }
        setImage(file);
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = fileInput.current.files[0];
        if (file == undefined) {
            alert('Por favor insira sua foto!')
            return
        }

        const validFileExtensions = ['.jpg', '.jpeg', '.png', '.ico'];

        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!validFileExtensions.includes(fileExtension)) {
            alert('O arquivo selecionado não é uma imagem JPG, JPEG, PNG ou ICO.');
            return;
        }


        const uniqueFileName = uuidv4() + fileExtension;
        
        
        const formData = new File([file], uniqueFileName);

        if (InputPassWord == Re_InputPassWord) {
            const infos = {
                nome: InputNome,
                diretorio: formData,
                email: InputEmail,
                senha: InputPassWord,
                re_senha: Re_InputPassWord,
                cnh: '',
                placa_carro: '',
            }
    
            Register_func(infos.diretorio, infos.email, infos.senha, infos.re_senha, infos.nome, infos.cnh, infos.placa_carro);
        } else {
            alert('As senhas não conferem!');
        }

    };

    const registerStyle = {
        transition: 'transform 0.2s ease',
        transform: login_Act ? 'translateX(0px)' : 'translateX(400px)',
    };

    const inputFields = [
        { onchange: handleInputNome, type: 'text', name: 'usuario_registro', id: 'usuario_registro', label: 'Usuário', icon: <BsFillPersonFill /> },
        { onchange: handleInputEmail, type: 'email', name: 'email_registro', id: 'email_registro', label: 'E-mail', icon: <MdEmail /> },
        { onchange: handleInputPassWord, type: 'password', name: 'senha_registro', id: 'senha_registro', label: 'Senha', icon: <BiSolidLockAlt /> },
        { onchange: handleRe_InputPassWord, type: 'password', name: 'senha_registro', id: 'senha_registro', label: 'Confirmar Senha', icon: <BiSolidLockAlt /> }
    ];

    return (
        <div style={registerStyle} className={style.form_box}>
            <h2>Registro</h2>
            <FormGeneric onsubmit={handleUpload}>
                <div className={style.input_foto} onClick={hundleImageClick}>
                    <div className={style.max_width}>
                        <div className="imageContainer">
                            {image ? (<img src={URL.createObjectURL(image)} alt="Selecione uma imagem" className={style.imgPhoto} />) : (<img src={camera} alt="Selecione uma imagem" className={style.imgPhoto} />)}
                        </div>
                    </div>
                    <input ref={(element) => {
                        inputRef.current = element; // Atualize o ref inputRef
                        fileInput.current = element; // Atualize o ref fileInput
                    }
                    } onChange={hundleImageChange} type="file" name="file" accept="image/*" />
                </div>
                <>
                    {inputFields.map((field, index) => (
                        <div className={style.input_box} key={index}>
                            <span className={style.icon}>{field.icon}</span>
                            <input type={field.type} name={field.name} id={field.id} onChange={field.onchange} required />
                            <label>{field.label}</label>
                        </div>
                    ))}
                </>
                <div className={style.remember_forgot}>
                    <label><input type="checkbox" required />Eu aceito os termos & condições</label>
                </div>
                <Button_p Type={"submit"} ID={'Button_register'} nome={'btn'}>
                    <div className="message submitMessage">
                        <span id="Button-text" className="button-text"><div className="register-name">Registrar-se</div></span>
                    </div>
                    {/* <div className="loading register">Loading</div> */}
                </Button_p>
                <div className={style.login_register}>
                    <p>Já possui uma conta? <a onClick={login_turn} className="login-link">Login</a></p>
                </div>
            </FormGeneric>
        </div >

    );
}

export default RegisterForm;