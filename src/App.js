import React, { useState, useEffect, useRef, useCallback } from 'react';
import ContentBox from "./components/boxes/content";
import CelebritiesList from "./components/list/index";
import InfoCard from "./components/info";
import Modal from "./components/modal";
import useFetch from './utils/fetch';

function App() {
    const { data, loading, error } = useFetch('https://cdnapi.smotrim.ru/api/v1/boxes/vesti2');
    const [celebrities, setCelebrities] = useState([]);
    const [currentCelebrity, setCurrentCelebrity] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
        if (data) {
            const superStars = data.data.content.find((it) => it.title === "Персоны").content.map((el) => ({
                ...el,
                img: `https://api.smotrim.ru/api/v1/pictures/${el['picId']}/bq/redirect`,
                infoUrl: `https://cdnapi.smotrim.ru/api/v1/persons/${el['id']}`
            }));
            setCelebrities(superStars);
            setTotalSlides(superStars.length);
        }
    }, [data]);

    const handleSlideChange = useCallback((swiper) => {
        setCurrentSlide(swiper.activeIndex);
    }, []);

    const handleCardClick = (celebrity) => {
        setCurrentCelebrity(celebrity);
        openModal();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <main className="App">
            <ContentBox>
                <section>
                    {isModalOpen && (
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            {currentCelebrity ? (
                                <InfoCard currentCelebrity={currentCelebrity} onClose={closeModal} />
                            ) : (
                                <div>Loading...</div>
                            )}
                        </Modal>
                    )}
                    {celebrities.length > 0 && (
                        <CelebritiesList
                            celebrities={celebrities}
                            handleCardClick={handleCardClick}
                            handleSlideChange={handleSlideChange}
                            currentSlide={currentSlide}
                            totalSlides={totalSlides}
                        />
                    )}
                </section>
            </ContentBox>
        </main>
    );
}

export default App;
