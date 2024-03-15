"use client"

import AuthenticationContext from '@/contexts/AuthenticationContext';
import React, { useState, useContext } from 'react';
import styles from './page.module.css';
import { Container } from 'postcss';

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
                <img src="" alt="Logo aqui" />
                <span>Seja bem vindo!Sistema de Cadastro de atletas e esporte</span>
                
            </div>
            <div className={styles.rightSide}>
                <img src="" alt="logo aqui" />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.groupForm}>
                        <label className={styles.label}>Email</label>
                        <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.groupForm}>
                        <label className={styles.label}>Senha</label>
                        <input className={styles.input} type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <button type="submit">Log in</button>
                    {
                        backendResponse && <p>{backendResponse}</p>
                    }
                </form>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
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
        </form>
        </>
    );
};

export default LoginPage;