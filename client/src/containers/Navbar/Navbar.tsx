import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthenticationContext from '@/contexts/AuthenticationContext';
import { useContext } from 'react';
import NavItem from '@/components/NavItem/NavItem';

import styles from './Navbar.module.css';
import Link from 'next/link';
const Navbar = () => {
    const { isAuthenticated, checkAuthentication } = useContext(AuthenticationContext)

    checkAuthentication()

    const handleLogout = () => {
        localStorage.removeItem('cm-jwt-token')
        checkAuthentication()
    }

    return (
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <Typography variant="h6" component="div" className={styles.logo}>
                    <Link href="/">
                        SisCampCed
                    </Link>
                </Typography>
                <div className={styles.navItemList} >
                    <NavItem href="/times" text="Times" />
                    <NavItem href="/jogadores" text="Jogadores" />
                    <NavItem href="/responsaveis" text="Responsaveis" />
                    <NavItem href="/esportes" text="Esportes" />
                    <NavItem href='/posicoes' text='Posições' />
                    <NavItem href='/fichas-tecnicas' text='Fichas Técnicas' />
                    <NavItem href='/enderecos' text='Enderecos' />
                    <NavItem href='/documentos' text='Documentos' />
                </div>
                {
                    isAuthenticated
                        ? <Button color="inherit" onClick={handleLogout}>Sair</Button>
                        : <Link href="/login">
                            <Button color="inherit">Login</Button>
                          </Link>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;