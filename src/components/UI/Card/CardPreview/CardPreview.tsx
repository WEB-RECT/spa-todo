import React from 'react';
import styles from './CardPreview.module.scss'

const CardPreview = () => {
    return (
        <div className={styles.box}>
            Ваша карточка будет здесь
        </div>
    );
};

export default React.memo(CardPreview);