import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from '../card/index';
import styles from './celebritiesList.module.scss';
import NavigationArrows from "../navigation";
import {swiperConfig} from "../../config/swiperConfig";

const CelebritiesList = ({ celebrities, handleCardClick }) => {
    return (
        <div className={styles.carousel}>
            <div className={styles.wrapper}>
                <Swiper {...swiperConfig}>
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
               <NavigationArrows/>
            </div>
        </div>
    );
};

export default CelebritiesList;
