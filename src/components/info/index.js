import React from 'react';
import styles from './info.module.scss';
import imgClose from '../../img/closeButton.svg'
import parse from 'html-react-parser';
import useFetch from '../../utils/fetch';

const InfoCard = ({ currentCelebrity, onClose }) => {

    const { infoUrl , img } = currentCelebrity || {};
    const { data: info, loading, error } = useFetch(infoUrl);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;

    const { data: {name, surname, body} } = info || {};

    return (
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <button onClick={onClose} className={styles.close}>
                    <img src={imgClose} alt="Close"/>
                </button>
                <div className={styles.nameContainer}>
                    <img className={styles.img} src={img} alt="Celebrity" />
                    <div className={styles.name}>
                        <h2>{name} {surname}</h2>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    {parse(body)}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
