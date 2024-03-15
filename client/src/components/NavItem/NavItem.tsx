import Link from "next/link"
import Button from '@mui/material/Button';

import styles from './NavItem.module.css';

const NavItem = ({ href, text, active }: { href: string, text: string, active: boolean }) => {
    return (
        <Link href={href} className={
            active ? styles.active : ''
        }>
            <Button color="inherit">{text}</Button>
        </Link>
    )
}

export default NavItem;