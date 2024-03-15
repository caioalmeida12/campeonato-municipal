"use client"

import AuthenticationContext from '@/contexts/AuthenticationContext';
import React, { useState, useContext } from 'react';
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import logoPrefeitura from '@/../public/assets/img/logoPrefeitura.png';
import logoSigae from '@/../public/assets/img/logoSigae.png';
import Footer from '@/components/Footer/Footer';
import TextField from '@mui/material/TextField';

const LoginPage: React.FC = () => {
    const { checkAuthentication } = useContext(AuthenticationContext)
    const [backendResponse, setBackendResponse] = useState('')

    checkAuthentication()

    const [email, setEmail] = useState('caiodealmeida12@gmail.com');
    const [senha, setSenha] = useState('12345678');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:5000/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data)
            localStorage.setItem('cm-jwt-token', data.token);
            window.location.href = "/";
            setBackendResponse("Logado com sucesso!");
        } else {
            console.error(data)
            setBackendResponse(data.message);
        }

        checkAuthentication();
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Image src={logoPrefeitura} alt="Logo da prefeitura" />
                    <div className={styles.welcome}>
                        <span className={styles.spanFirst}>Seja bem vindo!</span>
                        <span className={styles.spanSecond}>Sistema de Cadastro de <br />
                            Atletas e Esporte</span>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <Image src={logoSigae} alt="Logo do SIGAE" />
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.groupForm}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.groupForm}>
                            <TextField
                                label="Senha"
                                variant="outlined"
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                        </div>
                        <Button variant="verde">Entrar</Button>
                        {
                            backendResponse && <p style={{color: "green"}}>{backendResponse}</p>
                        }
                    </form>
                </div>
            </div>
            <Footer />
            {/* <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Senha:
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            </label>
            <button type="submit">Log in</button>
            {
                backendResponse && <p>{backendResponse}</p>
            }
        </form> */}
        </>
    );
};

export default LoginPage;