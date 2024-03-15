import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <h3>© 2021</h3>
                <h3>© 2021</h3>
                <h3>© 2021</h3>
            </div>
            <div className={styles.footerRight}>
                <h3>© 2021</h3>
                <h3>© 2021</h3>
                <h3>© 2021</h3>
            </div>
        </footer>
    );
    }

export default Footer;