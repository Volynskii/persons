import styles from '../app.module.scss';
import { Navigation } from 'swiper/modules';

export const swiperConfig = {
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.prev',
        prevEl: '.next',
        disabledClass: styles.hidden,
    },
    modules: [Navigation],
};
