import React from 'react';

import styles from './Structure.module.css';

const Structure = ({ headerText, children }: { headerText: string, children: React.ReactNode }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>{headerText}</h1>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}

export default Structure;