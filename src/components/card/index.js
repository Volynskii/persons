import React from 'react';
import styles from './card.module.scss'

const Card = ({name,surname, img, onClick}) => {

    return (
        <div onClick={onClick} className={styles.card}>
            <img alt={'picture'} src={img} className={styles.img}/>
            <div className={styles.nameContainer}>
                <h2>{name}</h2>
                <h2>{surname}</h2>
            </div>
        </div>
    );
};

export default Card;