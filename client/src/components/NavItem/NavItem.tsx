import Link from "next/link"
import Button from '@mui/material/Button';

const NavItem = ({ href, text }: { href: string, text: string }) => {
    return (
        <Link href={href}>
            <Button color="inherit">{text}</Button>
        </Link>
    )
}

export default NavItem;