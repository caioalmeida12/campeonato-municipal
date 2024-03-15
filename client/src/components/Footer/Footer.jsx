import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <h3>SIGAE</h3>
                <h3>Versão 1.0</h3>
                <h3>Informações Extras</h3>
            </div>
            <div className={styles.footerRight}>
                <h3>Desenvolvido por</h3>
                <h3>Em parceria com</h3>
                <h3>Informações Extras</h3>
                {/* <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
        /> */}
            </div>
        </footer>
    );
    }

export default Footer;