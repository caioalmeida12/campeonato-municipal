import Link from "next/link"
import Button from '@mui/material/Button';

import styles from './NavItem.module.css';

const isActive = (href: string) => {
    return href === window.location.pathname ? styles.active : ''
}

const NavItem = ({ href, text }: { href: string, text: string }) => {
    return (
        <Link href={href} className={isActive(href)}>
            <Button color="inherit">{text}</Button>
        </Link>
    )
}

export default NavItem;