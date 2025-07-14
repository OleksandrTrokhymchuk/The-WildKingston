"use client"

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnimalNews } from "../../app/store/animalNewsSlice"
import styles from "./HeroNews.module.css"
import blockStyles from "../../styles/AdditionalStyles/BlockStyles/BlockStyles.module.css" 
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ParallaxContainer from "../ParallaxSection";
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"

export default function HeroNews() {

    const swiperRef = useRef(null)

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.autoplay && swiperRef.current.autoplay.start()
            swiperRef.current.navigation.init()
            swiperRef.current.navigation.update()
        }
    }, [])

    const animalNewsInfo = useSelector(state => state.animalNewsSlice.animalNewsInfo)
    const status = useSelector(state => state.animalNewsSlice.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAnimalNews())
    }, [])

    return (
        <section>
            <ParallaxContainer additionalStyles="" className={parallaxStyles["parallax-item"]}>
                <div className={styles["news__header"]}>
                    <div className={`${blockStyles["block-header"]} ${blockStyles["block-header--center"]}`}>
                        <div className={blockStyles["block-header__label"]}>News</div>
                        <h2 className={blockStyles["block-header__title"]}>Animal World's News</h2>
                        <div className={blockStyles["block-header__text"]}>
                            <p>
                                Explore something new for you and your pets!
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`${styles["swiper"]} ${styles["news-slider"]}`}>
                    <Swiper className={`${styles["news__wrapper"]} ${styles["swiper-wrapper"]}`}
                        modules={[Navigation, A11y, Autoplay]}
                        spaceBetween={40}
                        speed={22000}
                        autoplay={{
                            delay: 1, 
                            disableOnInteraction: false, 
                        }}
                        breakpoints={{
                            320: {
                              slidesPerView: 1,
                            },
                            640: {
                              slidesPerView: 2,
                            },
                            1024: {
                              slidesPerView: 3,
                            },
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {
                            status === "resolved" && 
                            <>
                                {
                                    animalNewsInfo.articles.map(article => 
                                        <SwiperSlide className={styles["news__slide"]}>
                                            <p>{article.content.split("[")[0]}</p>
                                            <a className={styles["news__slide--link"]} target='_blank' href={article.url}>Read More</a>
                                            <a href={article.url} target='_blank'>
                                                <img src={article.urlToImage} alt="News Photo" />
                                            </a>
                                        </SwiperSlide>
                                    )
                                }
                            </>
                        }   
                    </Swiper>
                </div>
            </ParallaxContainer>      
        </section>
    )
}