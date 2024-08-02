import React from 'react';
import classNames from "classnames";
import styles from './navigation.module.scss';

const NavigationArrows = ({ currentSlide, totalSlides }) => {
    return (
        <div className={styles.navContainer}>
            <div className={styles.navContainerWrapper}>
                <div className={classNames('prev', { [styles.hidden]: currentSlide === 0 })}></div>
                <div className={classNames('next', { [styles.hidden]: currentSlide === totalSlides - 1 })}></div>
            </div>
        </div>
    );
};

export default NavigationArrows;
