import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthenticationContext from '@/contexts/AuthenticationContext';
import { MouseEventHandler, useContext } from 'react';
import NavItem from '@/components/NavItem/NavItem';

import styles from './Navbar.module.css';
import Link from 'next/link';

const navItems = [
    {
        href: '/times',
        text: 'Times'
    },
    {
        href: '/jogadores',
        text: 'Jogadores'
    },
    {
        href: '/responsaveis',
        text: 'Responsaveis'
    },
    {
        href: '/esportes',
        text: 'Esportes'
    },
    {
        href: '/posicoes',
        text: 'Posições'
    },
    {
        href: '/fichas-tecnicas',
        text: 'Fichas Técnicas'
    },
    {
        href: '/enderecos',
        text: 'Enderecos'
    },
    {
        href: '/documentos',
        text: 'Documentos'
    }
]
const Navbar = () => {
    const { isAuthenticated, checkAuthentication } = useContext(AuthenticationContext)
    const [activeNavItem, setActiveNavItem] = React.useState('' as string)

    checkAuthentication()

    const handleLogout = () => {
        localStorage.removeItem('cm-jwt-token')
        checkAuthentication()
    }

    const handleNavItem = (e: any): MouseEventHandler<HTMLDivElement> | undefined => {
        const target = e.target as HTMLButtonElement
        setActiveNavItem(target.textContent as string)

        return undefined
    }

    return (
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <Typography variant="h6" component="div" className={styles.logo}>
                    <Link href="/">
                        SICAE
                    </Link>
                </Typography>
                <div className={styles.navItemList} onClick={handleNavItem}>
                    {
                        navItems.map((item, index) => (
                            <NavItem key={index} href={item.href} text={item.text} active={activeNavItem === item.text} />
                        ))
                    }
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