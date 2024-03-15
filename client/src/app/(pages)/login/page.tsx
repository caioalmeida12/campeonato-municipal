"use client"

import AuthenticationContext from '@/contexts/AuthenticationContext';
import React, { useState, useContext } from 'react';
import styles from './page.module.css';
import { Container } from 'postcss';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import logoPrefeitura from '@/../public/assets/img/logoPrefeitura.png';
import logoSigae from '@/../public/assets/img/logoSigae.png';
import Input from '@/components/Input/Input';

const LoginPage: React.FC = () => {
    const { isAuthenticated, checkAuthentication } = useContext(AuthenticationContext)
    const [backendResponse, setBackendResponse] = useState('')

    checkAuthentication()

    const [email, setEmail] = useState('caiodealmeida12@gmail.com');
    const [senha, setSenha] = useState('12345678');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ROUTE_AUTH}`, {
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
                    <span className={styles.spanSecond}>Sistema de Cadastro de <br/>
                        Atletas e Esporte</span>
                </div>
            </div>
            <div className={styles.rightSide}>
                <Image src={logoSigae} alt="Logo do SIGAE" />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.groupForm}>
                        <label className={styles.label}>Email</label>
                        <Input variant="cinza" type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                        {/* <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} /> */}
                    </div>
                    <div className={styles.groupForm}>
                        <label className={styles.label}>Senha</label>
                        <Input variant="cinza" type="password" placeholder="Digite sua senha" value={senha} onChange={e => setSenha(e.target.value)} />
                        {/* <input className={styles.input} type="password" value={senha} onChange={e => setSenha(e.target.value)} /> */}
                    </div>
                    <Button variant="verde" type="submit">Entrar</Button>
                    {
                        backendResponse && <p>{backendResponse}</p>
                    }
                </form>
            </div>
        </div>
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