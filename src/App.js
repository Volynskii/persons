import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './app.module.scss';
import ContentBox from "./components/boxes/content";
import Card from "./components/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Info from "./components/info";
import Modal from "./components/modal";
import classNames from 'classnames';
import useFetch from './utils/fetch';

function App() {
    const { data, loading, error } = useFetch('https://cdnapi.smotrim.ru/api/v1/boxes/vesti2');
    const [celebrities, setCelebrities] = useState([]);
    const [currentCelebrity, setCurrentCelebrity] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const swiperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
        if (data) {
            const superStars = data.data.content.find((it) => it.title === "Персоны").content.map((el) => ({
                ...el,
                img: `https://api.smotrim.ru/api/v1/pictures/${el['picId']}/bq/redirect`
            }));
            setCelebrities(superStars);
            setTotalSlides(superStars.length);
        }
    }, [data]);

    const handleSlideChange = useCallback((swiper) => {
        setCurrentSlide(swiper.activeIndex);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <main className="App">
            <ContentBox>
                <section>
                    {isModalOpen && (
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <Info currentCelebrity={currentCelebrity} onClose={closeModal} />
                        </Modal>
                    )}
                    {celebrities.length > 0 && (
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
                                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                                    modules={[Navigation]}
                                >
                                    {celebrities.map((celebrity) => (
                                        <SwiperSlide key={celebrity.id}>
                                            <Card
                                                name={celebrity.name}
                                                surname={celebrity.surname}
                                                img={celebrity.img}
                                                onClick={() => {
                                                    setCurrentCelebrity(celebrity);
                                                    openModal();
                                                }}
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
                    )}
                </section>
            </ContentBox>
        </main>
    );
}

export default App;
