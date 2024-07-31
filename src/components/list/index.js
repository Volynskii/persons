import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Card from '../card/index';
import styles from './celebritiesList.module.scss';
import classNames from "classnames";

const CelebritiesList = ({ celebrities, handleCardClick, handleSlideChange, currentSlide, totalSlides }) => {
    return (
        <div className={styles.carousel}>
            <div className={styles.wrapper}>
                <Swiper
                    slidesPerView="auto"
                    navigation={{
                        nextEl: '.prev',
                        prevEl: '.next',
                        disabledClass: styles.hidden
                    }}
                    onSlideChange={handleSlideChange}
                    modules={[Navigation]}
                >
                    {celebrities.map((celebrity) => (
                        <SwiperSlide key={celebrity.id}>
                            <Card
                                name={celebrity.name}
                                surname={celebrity.surname}
                                img={celebrity.img}
                                onClick={() => handleCardClick(celebrity)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={styles.navContainer}>
                    <div className={styles.navContainerWrapper}>
                        <div className={classNames('prev', { [styles.hidden]: currentSlide === 0 })}></div>
                        <div className={classNames('next', { [styles.hidden]: currentSlide === totalSlides - 1 })}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CelebritiesList;
